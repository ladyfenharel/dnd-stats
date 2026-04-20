// src/components/SpellsByLevelChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSpells } from '../context/spellContext';
import { Typography } from '@mui/material';
import { aggregateSpellsByLevel } from '../utils/chartData';
import { ChartDatasetSkeleton } from './loading/ChartDatasetSkeleton';

const SpellsByLevelChart = () => {
  const { allSpellsForCharts, chartStatsLoading, chartStatsError } = useSpells();

  const data = aggregateSpellsByLevel(allSpellsForCharts);

  if (chartStatsLoading) {
    return <ChartDatasetSkeleton chartHeight={300} />;
  }

  if (chartStatsError) {
    return (
      <Typography color="error" variant="body2" role="alert">
        Could not load chart data: {chartStatsError}
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom component="h2">
        Spells by level (Open5e corpus)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Count per spell level across the full dataset ({allSpellsForCharts.length} spells).
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis label={{ value: 'Number of spells', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Spells" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpellsByLevelChart;
