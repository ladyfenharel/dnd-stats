// src/pages/SpellDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSpells } from '../context/spellContext';
import { Typography, Box, Button, Divider } from '@mui/material';
import { SpellDetailSkeleton } from '../components/loading/SpellDetailSkeleton';
import { spellDetailUrl } from '../utils/spellsApi';
import { cachedFetchJson } from '../utils/httpCache';
import {
  formatCastingTime,
  formatComponents,
  formatRange,
  formatLevelSchoolLine,
  formatClasses,
} from '../utils/spellDisplay';

function renderDescription(desc) {
  if (Array.isArray(desc)) {
    return desc.map((paragraph, index) => (
      <Typography key={index} component="p" variant="body1" sx={{ mb: 1.5 }}>
        {paragraph}
      </Typography>
    ));
  }
  if (desc == null || desc === '') {
    return null;
  }
  return (
    <Typography component="p" variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
      {desc}
    </Typography>
  );
}

export default function SpellDetail() {
  const { slug: spellKey } = useParams();
  const { spells } = useSpells();
  const navigate = useNavigate();

  const spellFromList = spells.find((s) => s.key === spellKey);
  const [fetchedSpell, setFetchedSpell] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (spellFromList || !spellKey) {
      setFetchedSpell(null);
      setFetchError(null);
      setFetchLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setFetchLoading(true);
      setFetchError(null);
      try {
        const data = await cachedFetchJson(spellDetailUrl(spellKey), { ttlMs: 30 * 60 * 1000 });
        if (!cancelled) {
          setFetchedSpell(data);
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(err.message);
          setFetchedSpell(null);
        }
      } finally {
        if (!cancelled) {
          setFetchLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [spellKey, spellFromList]);

  const spell = spellFromList ?? fetchedSpell;

  const handleGoBack = () => {
    navigate(-1);
  };

  const needsRemoteFetch = Boolean(spellKey && !spellFromList);
  if (needsRemoteFetch && (fetchLoading || (!fetchError && !fetchedSpell))) {
    return <SpellDetailSkeleton />;
  }

  if (fetchError && !spell) {
    return (
      <Box sx={{ mt: 4, ml: 4, p: 3 }}>
        <Typography color="error" gutterBottom>
          {fetchError}
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Back to Spell List
        </Button>
      </Box>
    );
  }

  if (!spell) {
    return (
      <Box sx={{ mt: 4, ml: 4, p: 3 }}>
        <Typography>Spell not found.</Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Back to Spell List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, maxWidth: 720 }}>
      <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 2 }}>
        Back to Spell List
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {spell.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {formatLevelSchoolLine(spell)}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" gutterBottom>
        <strong>Casting time:</strong> {formatCastingTime(spell)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Range:</strong> {formatRange(spell)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Components:</strong> {formatComponents(spell)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Duration:</strong> {spell.duration || '—'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Classes:</strong> {formatClasses(spell)}
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
        Description
      </Typography>
      {renderDescription(spell.desc)}
      {spell.higher_level && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontStyle: 'italic' }}>
            At higher levels
          </Typography>
          {Array.isArray(spell.higher_level) ? (
            spell.higher_level.map((paragraph, index) => (
              <Typography key={`higher-${index}`} component="p" variant="body1" sx={{ mb: 1.5 }}>
                {paragraph}
              </Typography>
            ))
          ) : (
            <Typography component="p" variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {spell.higher_level}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
