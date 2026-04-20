import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack, Divider } from '@mui/material';
import { useSpells } from '../context/spellContext';
import {
  formatCastingTime,
  formatClasses,
  formatLevelSchoolLine,
  formatRange,
} from '../utils/spellDisplay';

function renderDescription(desc) {
  if (Array.isArray(desc)) {
    return desc.map((paragraph, index) => (
      <Typography key={index} variant="body2" sx={{ mb: 1 }}>
        {paragraph}
      </Typography>
    ));
  }
  if (!desc) return <Typography variant="body2">—</Typography>;
  return (
    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
      {desc}
    </Typography>
  );
}

export default function SpellListDetail() {
  const navigate = useNavigate();
  const { spellListId } = useParams();
  const { savedSpellLists, allSpellsForCharts, spells } = useSpells();

  const spellList = useMemo(
    () => savedSpellLists.find((entry) => entry.id === spellListId) ?? null,
    [savedSpellLists, spellListId],
  );

  const pool = allSpellsForCharts.length > 0 ? allSpellsForCharts : spells;
  const spellMap = useMemo(() => new Map(pool.map((spell) => [spell.key, spell])), [pool]);
  const resolvedSpells = useMemo(
    () => (spellList ? spellList.spells.map((key) => spellMap.get(key)).filter(Boolean) : []),
    [spellList, spellMap],
  );

  if (!spellList) {
    return (
      <Box sx={{ mt: 2, maxWidth: 860 }}>
        <Typography variant="h5" gutterBottom>
          Spell list not found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This saved spell list may have been deleted.
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, maxWidth: 980 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1">
            {spellList.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {spellList.spells.length} spells saved • {new Date(spellList.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="contained" onClick={() => window.print()}>
            Print
          </Button>
        </Stack>
      </Stack>

      {resolvedSpells.length === 0 ? (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">
            This spell list has spell keys, but details are not available in the current spell dataset.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {resolvedSpells.map((spell) => (
            <Paper key={spell.key} variant="outlined" sx={{ p: 2, breakInside: 'avoid' }}>
              <Typography variant="h6" component="h2">
                {spell.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                {formatLevelSchoolLine(spell)}
              </Typography>
              <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                <Typography variant="body2"><strong>Casting:</strong> {formatCastingTime(spell)}</Typography>
                <Typography variant="body2"><strong>Range:</strong> {formatRange(spell)}</Typography>
                <Typography variant="body2"><strong>Duration:</strong> {spell.duration || '—'}</Typography>
                <Typography variant="body2"><strong>Classes:</strong> {formatClasses(spell)}</Typography>
              </Stack>
              <Divider sx={{ mb: 1.25 }} />
              {renderDescription(spell.desc)}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
