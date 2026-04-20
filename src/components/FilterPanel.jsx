// src/components/FilterPanel.jsx
import React from 'react';
import { useMemo, useState } from 'react';
import { useSpells } from '../context/spellContext';
import { FormControl, Select, MenuItem, InputLabel, Box, Typography, Button } from '@mui/material';
import { collectClassOptionsFromSpells } from '../utils/classOptions';

const FilterPanel = ({ compact = false }) => {
  const { spells, allSpellsForCharts, chartStatsLoading, setFilters, setSearchQuery, requestSortReset } = useSpells();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClassKey, setSelectedClassKey] = useState('');

  const schoolSource = allSpellsForCharts.length > 0 ? allSpellsForCharts : spells;

  const schoolOptions = useMemo(() => {
    const byKey = new Map();
    for (const spell of schoolSource) {
      const key = spell.school?.key;
      const name = spell.school?.name;
      if (key && name && !byKey.has(key)) {
        byKey.set(key, name);
      }
    }
    return [...byKey.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [schoolSource]);

  const classOptions = useMemo(
    () => collectClassOptionsFromSpells(schoolSource),
    [schoolSource],
  );

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setSelectedLevel(value);
    setFilters((prev) => ({ ...prev, level: value }));
  };

  const handleSchoolChange = (e) => {
    const schoolValue = e.target.value;
    setSelectedSchool(schoolValue);
    setFilters((prev) => ({ ...prev, school: schoolValue }));
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClassKey(value);
    setFilters((prev) => ({ ...prev, classKey: value }));
  };

  const clearFilters = () => {
    setSelectedLevel('');
    setSelectedSchool('');
    setSelectedClassKey('');
    setSearchQuery('');
    setFilters({});
    requestSortReset();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: compact ? { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' } : '1fr',
      }}
    >
      <Box>
        <FormControl fullWidth>
          <InputLabel id="spell-level-filter-label">Level</InputLabel>
          <Select
            labelId="spell-level-filter-label"
            label="Level"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="0">Cantrip</MenuItem>
            <MenuItem value="1">1st-Level</MenuItem>
            <MenuItem value="2">2nd-Level</MenuItem>
            <MenuItem value="3">3rd-Level</MenuItem>
            <MenuItem value="4">4th-Level</MenuItem>
            <MenuItem value="5">5th-Level</MenuItem>
            <MenuItem value="6">6th-Level</MenuItem>
            <MenuItem value="7">7th-Level</MenuItem>
            <MenuItem value="8">8th-Level</MenuItem>
            <MenuItem value="9">9th-Level</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="spell-school-filter-label">School</InputLabel>
          <Select
            labelId="spell-school-filter-label"
            value={selectedSchool}
            label="School"
            onChange={handleSchoolChange}
          >
            <MenuItem value="">All Schools</MenuItem>
            {schoolOptions.map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="spell-class-filter-label">Class</InputLabel>
          <Select
            labelId="spell-class-filter-label"
            value={selectedClassKey}
            label="My class"
            onChange={handleClassChange}
            disabled={classOptions.length === 0}
          >
            <MenuItem value="">All classes</MenuItem>
            {classOptions.map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!compact && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {classOptions.length === 0 && chartStatsLoading
              ? 'Loading class list from the full spell dataset…'
              : 'Uses Open5e class tags on each spell (coverage depends on sourcebook).'}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          gridColumn: compact ? { xs: '1', sm: '1 / -1' } : '1',
          display: 'flex',
          justifyContent: compact ? { xs: 'stretch', sm: 'flex-end' } : 'flex-start',
          alignItems: 'center',
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={clearFilters}
        >
          Clear filters/sort
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPanel;
