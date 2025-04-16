// src/components/SpellsBySchoolChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useSpells } from '../context/SpellContext';
import { Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff7f50']; // Example colors

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    percent > 0.05 && ( // Only show label if percentage is greater than 5%
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  );
};

const SpellsBySchoolChart = () => {
  const { spells } = useSpells();

  const schoolCounts = spells.reduce((acc, spell) => {
    const schoolName = spell.school ? spell.school.trim().toLowerCase() : 'Unknown';
    acc[schoolName] = (acc[schoolName] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(schoolCounts)
    .sort()
    .map((school, index) => ({
      name: school.charAt(0).toUpperCase() + school.slice(1),
      value: schoolCounts[school],
      color: COLORS[index % COLORS.length], // Cycle through colors
    }));

    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Distribution of Spells by School
        </Typography>
        <ResponsiveContainer width="100%" height={350}> {/* Adjusted height to match Paper */}
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120} // Adjust this value to make it smaller
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>  
  );
};

export default SpellsBySchoolChart;