import React, { useState, useEffect, useMemo } from "react";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Slider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [spells, setSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [levelFilterType, setLevelFilterType] = useState("dropdown"); // 'dropdown', 'slider', 'text'
    const [selectedLevelDropdown, setSelectedLevelDropdown] = useState("");
    const [levelRange, setLevelRange] = useState([0, 9]);
    const [levelText, setLevelText] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleLevelFilterTypeChange = (event) => {
        setLevelFilterType(event.target.value);
        setSelectedLevelDropdown("");
        setLevelRange([0, 9]);
        setLevelText("");
    };

    const handleLevelDropdownChange = (event) => {
        setSelectedLevelDropdown(event.target.value);
    };

    const handleLevelSliderChange = (event, newValue) => {
        setLevelRange(newValue);
    };

    const handleLevelTextChange = (event) => {
        setLevelText(event.target.value);
    };

    const handleSchoolChange = (event) => {
        setSelectedSchool(event.target.value);
    };

    // Fetch spells based on filter type and selected values
    useEffect(() => {
        const fetchSpells = async () => {
            setLoading(true);
            let apiUrl = 'https://api.open5e.com/v1/spells/';
            const queryParams = new URLSearchParams();

            // Handle different level filter types
            if (levelFilterType === "dropdown" && selectedLevelDropdown !== "") {
                queryParams.append('level_int', selectedLevelDropdown);
            } else if (levelFilterType === "slider") {
                queryParams.append('spell_level__range', `${levelRange[0]},${levelRange[1]}`);
            } else if (levelFilterType === "text" && levelText.trim() !== "") {
                const levels = levelText.split('-').map(Number).filter(num => !isNaN(num) && num >= 0 && num <= 9);
                if (levels.length === 1) {
                    queryParams.append('level_int', levels[0]);
                } else if (levels.length === 2 && levels[0] <= levels[1]) {
                    queryParams.append('spell_level__range', `${levels[0]},${levels[1]}`);
                }
            }

            if (selectedSchool) {
                queryParams.append('school', selectedSchool);
            }

            if (queryParams.toString()) {
                apiUrl += `?${queryParams}`;
            }

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setSpells(data.results);
            } catch (error) {
                console.error("Error fetching spells:", error);
            } finally {
              setLoading(false); // Set loading to false when done
          }
        };

        fetchSpells();
    }, [levelFilterType, selectedLevelDropdown, levelRange, levelText, selectedSchool]);

    // Filtering based on search term
    const filteredSpells = useMemo(() => {
        return spells.filter((spell) => {
            return spell.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [spells, searchTerm]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar with Filters */}
            <Paper sx={{ width: 280, flexShrink: 0, p: 3, mt: '64px', borderRight: '1px solid #eee' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    Spell Filters
                </Typography>

                {/* Search Bar */}
                <TextField
                    label="Search Spells"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                {/* Level Filter Type Selection */}
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel id="level-filter-type-label">Level Filter Type</InputLabel>
                    <Select
                        labelId="level-filter-type-label"
                        value={levelFilterType}
                        label="Level Filter Type"
                        onChange={handleLevelFilterTypeChange}
                    >
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                        <MenuItem value="slider">Slider</MenuItem>
                        <MenuItem value="text">Text Input</MenuItem>
                    </Select>
                </FormControl>

                {/* Level Filter UI based on selected type */}
                {levelFilterType === "dropdown" && (
                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel id="spell-level-filter-label">Spell Level</InputLabel>
                        <Select
                            labelId="spell-level-filter-label"
                            value={selectedLevelDropdown}
                            label="Spell Level"
                            onChange={handleLevelDropdownChange}
                        >
                            <MenuItem value="">All Levels</MenuItem>
                            <MenuItem value="0">Cantrip</MenuItem>
                            <MenuItem value="1">1st Level</MenuItem>
                            <MenuItem value="2">2nd Level</MenuItem>
                            <MenuItem value="3">3rd Level</MenuItem>
                            <MenuItem value="4">4th Level</MenuItem>
                            <MenuItem value="5">5th Level</MenuItem>
                            <MenuItem value="6">6th Level</MenuItem>
                            <MenuItem value="7">7th Level</MenuItem>
                            <MenuItem value="8">8th Level</MenuItem>
                            <MenuItem value="9">9th Level</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {levelFilterType === "slider" && (
                    <Box sx={{ mb: 2 }}>
                        <Typography id="level-slider" gutterBottom>
                            Spell Level Range
                        </Typography>
                        <Slider
                            value={levelRange}
                            onChange={handleLevelSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={9}
                            aria-labelledby="level-slider"
                            valueLabelFormat={(value) => (value === 0 ? 'Cantrip' : `${value}`)}
                        />
                        <Typography sx={{ fontSize: '0.8em', color: 'text.secondary' }}>
                            Range: {levelRange[0] === 0 ? 'Cantrip' : levelRange[0]} - {levelRange[1] === 0 ? 'Cantrip' : levelRange[1]}
                        </Typography>
                    </Box>
                )}

                {levelFilterType === "text" && (
                    <TextField
                        label="Enter Level(s) (e.g., 1 or 1-3)"
                        variant="outlined"
                        size="small"
                        value={levelText}
                        onChange={handleLevelTextChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        placeholder="e.g., 2 or 4-7"
                    />
                )}

                {/* School Filter */}
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel id="school-filter-label">School</InputLabel>
                    <Select
                        labelId="school-filter-label"
                        value={selectedSchool}
                        label="School"
                        onChange={handleSchoolChange}
                    >
                        <MenuItem value="">All Schools</MenuItem>
                        <MenuItem value="abjuration">Abjuration</MenuItem>
                        <MenuItem value="conjuration">Conjuration</MenuItem>
                        <MenuItem value="divination">Divination</MenuItem>
                        <MenuItem value="enchantment">Enchantment</MenuItem>
                        <MenuItem value="evocation">Evocation</MenuItem>
                        <MenuItem value="illusion">Illusion</MenuItem>
                        <MenuItem value="necromancy">Necromancy</MenuItem>
                        <MenuItem value="transmutation">Transmutation</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
                    {filteredSpells.map((spell) => (
                        <Box key={spell.id} sx={{ border: '1px solid #eee', padding: 2, borderRadius: 1 }}>
                            <Typography variant="h6">{spell.name}</Typography>
                            <Typography variant="body2">{spell.school}</Typography>
                            <Typography variant="body2">{spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Sidebar;
