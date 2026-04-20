// src/components/SpellsBySchoolChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useSpells } from '../context/spellContext';
import { Typography, Box } from '@mui/material';
import { aggregateSpellsBySchool } from '../utils/chartData';
import { ChartDatasetSkeleton } from './loading/ChartDatasetSkeleton';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
  '#ff7f50',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    percent > 0.05 && (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  );
};

const SpellsBySchoolChart = () => {
  const { allSpellsForCharts, chartStatsLoading, chartStatsError } = useSpells();

  const aggregated = aggregateSpellsBySchool(allSpellsForCharts);
  const data = aggregated.map((entry, index) => ({
    ...entry,
    color: COLORS[index % COLORS.length],
  }));

  if (chartStatsLoading) {
    return <ChartDatasetSkeleton chartHeight={400} />;
  }

  if (chartStatsError) {
    return (
      <Typography color="error" variant="body2" role="alert">
        Could not load chart data: {chartStatsError}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0 }}>
      <Typography variant="h6" gutterBottom component="h2">
        Spells by school (Open5e corpus)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Distribution across all spells in the API ({allSpellsForCharts.length} spells).
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: { xs: 320, sm: 400, md: 440 },
          flexShrink: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Pie
              data={data}
              cx="42%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="62%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.key}-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: 12, lineHeight: 1.35, paddingLeft: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default SpellsBySchoolChart;
