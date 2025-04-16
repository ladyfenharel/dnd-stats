// src/components/FilterPanel.jsx
import React from 'react';
import { useMemo, useState } from 'react';
import { useSpells } from '../context/SpellContext';
import { FormControl, Select, MenuItem, InputLabel, Grid } from '@mui/material';

const FilterPanel = () => {
    const { spells, setFilters } = useSpells();
    const [selectedSchool, setSelectedSchool] = useState('');

    const capitalizeWords = (str) => {
        if (!str) {
            return "";
        }
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const uniqueCapitalizedSchools = useMemo(() => {
        const schools = [...new Set(spells.map((spell) => spell.school))].sort();
        return schools.map(capitalizeWords);
    }, [spells]);

    // Handle filter when a Level is selected
    const handleLevelChange = (e) => {
        setFilters((prev) => ({ ...prev, level: e.target.value }));
    };

    // Handle filter when School is selected
    const handleSchoolChange = (e) => {
        const schoolValue = e.target.value;
        setSelectedSchool(schoolValue);
        setFilters((prev) => ({ ...prev, school: schoolValue }));
    };

    return (
        <Grid container spacing={1} direction="column">
            <Grid item xs={2}>
                <FormControl fullWidth>
                    <InputLabel>Level</InputLabel>
                    <Select onChange={handleLevelChange}>
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
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>School</InputLabel>
                    <Select
                        labelId="spell-school-filter-label"
                        value={selectedSchool}
                        label="Spell School"
                        onChange={handleSchoolChange}
                    >
                        <MenuItem value="">All Schools</MenuItem>
                        {uniqueCapitalizedSchools.map((school) => (
                            <MenuItem key={school} value={school.toLowerCase()}>
                                {school}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default FilterPanel;
