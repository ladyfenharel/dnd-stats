// src/pages/SpellDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpells } from '../context/SpellContext';
import { Typography, Box, Button, Toolbar } from '@mui/material';

export default function SpellDetail() {
  const { slug } = useParams();
  const { spells } = useSpells();
  const navigate = useNavigate();

  // Find the spell in the context based on the slug
  const spell = spells.find(spell => spell.slug === slug);

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page in history
  };

  if (!spell) {
    return (
      <Box sx={{ mt: 4, ml: 4, p: 3 }}>
        <Typography>Spell not found.</Typography>
        <Button onClick={handleGoBack} variant="outlined" sx={{ mt: 2 }}>
          Back to Spell List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, ml: 4, p: 3 }}>
      <Button onClick={handleGoBack} variant="outlined" sx={{ mb: 2 }}>
        Back to Spell List
      </Button>
      <Typography variant="h4" gutterBottom>
        {spell.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {spell.level === 0 ? 'Cantrip' : `${spell.level}`} {spell.school}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Casting Time:</b> {spell.casting_time}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Range:</b> {spell.range}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Components:</b> {spell.components} {spell.material ? `(${spell.material})` : ''}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Duration:</b> {spell.duration}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Classes:</b> {spell.dnd_class}
      </Typography>
      <Typography variant="body1">
        <b>Description:</b>
        {Array.isArray(spell.desc) ? (
          spell.desc.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>{spell.desc}</p>
        )}
        {spell.higher_level && (
          <>
            <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
              At Higher Levels:
            </Typography>
            {Array.isArray(spell.higher_level) ? (
              spell.higher_level.map((paragraph, index) => (
                <p key={`higher-${index}`}>{paragraph}</p>
              ))
            ) : (
              <p>{spell.higher_level}</p>
            )}
          </>
        )}
      </Typography>
    </Box>
  );
}