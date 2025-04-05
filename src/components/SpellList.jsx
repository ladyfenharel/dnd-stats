import React, { useState, useEffect, useMemo } from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Card,
    CardContent,
    Slider,
} from "@mui/material";

const capitalizeWords = (str) => {
    if (!str) {
        return "";
    }
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

function SpellList() {
    const [spells, setSpells] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [levelFilterType, setLevelFilterType] = useState("dropdown"); // 'dropdown', 'slider', 'text'
    const [selectedLevelDropdown, setSelectedLevelDropdown] = useState("");
    const [levelRange, setLevelRange] = useState([0, 9]);
    const [levelText, setLevelText] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [totalSpells, setTotalSpells] = useState(0);
    const [materialSpells, setMaterialSpells] = useState(0);
    const [concentrationSpells, setConcentrationSpells] = useState(0);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleLevelFilterTypeChange = (event) => {
        setLevelFilterType(event.target.value);
        // Reset level filters when type changes
        setSelectedLevelDropdown("");
        setLevelRange([0, 9]);
        setLevelText("");
    };

    const handleLevelDropdownChange = (event) => {
        setSelectedLevelDropdown(event.target.value);
    };

    const handleLevelSliderChange = (event, newValue) => {
        setLevelRange(newValue);
        console.log("Level Range:", newValue); // Add this
    };

    const handleLevelTextChange = (event) => {
        setLevelText(event.target.value);
        console.log("Level Text:", event.target.value); // Add this
    };

    const handleSchoolChange = (event) => {
        setSelectedSchool(event.target.value);
    };

    useEffect(() => {
        const fetchSpells = async () => {
            let apiUrl = 'https://api.open5e.com/v1/spells/';
            const queryParams = new URLSearchParams();

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

            console.log("Fetching URL:", apiUrl);

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setSpells(data.results);
            } catch (error) {
                console.error("Error fetching spells:", error);
            }
        };

        fetchSpells();
    }, [levelFilterType, selectedLevelDropdown, levelRange, levelText, selectedSchool]);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const totalResponse = await fetch('https://api.open5e.com/v1/spells/');
                const totalData = await totalResponse.json();
                setTotalSpells(totalData.count || 0);

                const materialResponse = await fetch('https://api.open5e.com/v1/spells/?requires_material_components=true');
                const materialData = await materialResponse.json();
                setMaterialSpells(materialData.count || 0);

                const concentrationResponse = await fetch('https://api.open5e.com/v1/spells/?requires_concentration=true');
                const concentrationData = await concentrationResponse.json();
                setConcentrationSpells(concentrationData.count || 0);
            } catch (error) {
                console.error("Error fetching spell stats:", error);
            }
        };

        fetchStats();
    }, []);

    const filteredSpells = spells.filter((spell) =>
        spell.name.toLowerCase().includes(searchTerm)
    );

    const uniqueCapitalizedSchools = useMemo(() => {
        const schools = [...new Set(spells.map((spell) => spell.school))].sort();
        return schools.map(capitalizeWords);
    }, [spells]);

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

                {/* Spell Level Filter based on Type */}
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

                {/* Spell School Filter */}
                <FormControl fullWidth size="small">
                    <InputLabel id="spell-school-filter-label">Spell School</InputLabel>
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
            </Paper>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', overflow: 'auto' }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Card sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Total Spells
                            </Typography>
                            <Typography variant="h4">
                                {totalSpells}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Material Components
                            </Typography>
                            <Typography variant="h4">
                                {materialSpells}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Requires Concentration
                            </Typography>
                            <Typography variant="h4">
                                {concentrationSpells}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Typography variant="h4" gutterBottom>
                    D&D 5e Spells
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="spell table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Level</TableCell>
                                <TableCell>School</TableCell>
                                <TableCell>Casting Time</TableCell>
                                <TableCell>Range</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSpells.map((spell) => (
                                <TableRow
                                    key={spell.slug}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {spell.name}
                                    </TableCell>
                                    <TableCell>{spell.level === 0 ? 'Cantrip' : spell.level}</TableCell>
                                    <TableCell>{capitalizeWords(spell.school)}</TableCell>
                                    <TableCell>{spell.casting_time}</TableCell>
                                    <TableCell>{spell.range}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default SpellList;