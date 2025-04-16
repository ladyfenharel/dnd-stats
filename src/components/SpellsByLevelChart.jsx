// src/components/SpellsByLevelChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSpells } from '../context/SpellContext';
import { Typography } from '@mui/material';

const SpellsByLevelChart = () => {
  const { spells } = useSpells();

  const levelCounts = spells.reduce((acc, spell) => {
    let levelLabel;
    if (spell.level === '0') {
      levelLabel = 'Cantrip';
    } else if (spell.level && spell.level.includes('-level')) {
      levelLabel = spell.level.split('-')[0];
    } else {
      levelLabel = spell.level || 'Unknown';
    }
    acc[levelLabel] = (acc[levelLabel] || 0) + 1;
    return acc;
  }, {});

  const sortedLevels = ['Cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'];
  const data = sortedLevels.map(level => ({
    level,
    count: levelCounts[level] || 0,
  }));

  return (
    <div>
      <Typography variant="h7" gutterBottom>
        Distribution of Spells by Level
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis label={{ value: 'Number of Spells', angle: -90, dx: -20 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpellsByLevelChart;