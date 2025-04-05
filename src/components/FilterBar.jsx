import React from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

function FilterBar({
  setClassFilter,
  setRaceSizeFilter,
  setRaceSpeedFilter,
  setPlaneParentFilter,
  setSearchTerm,
}) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Filters
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search..."
        variant="outlined"
        onChange={handleSearch}
        fullWidth
        size="small"
      />

      {/* Class Filters */}
      <FormControl fullWidth size="small">
        <InputLabel id="class-filter-label">Class Hit Dice</InputLabel>
        <Select
          labelId="class-filter-label"
          value="" // You'll need to manage the selected value with state in the parent component if needed
          label="Class Hit Dice"
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <MenuItem value="">All Classes</MenuItem>
          <MenuItem value="1d8">1d8</MenuItem>
          <MenuItem value="1d12">1d12</MenuItem>
          <MenuItem value="Strength">Strength</MenuItem>
          <MenuItem value="Dexterity">Dexterity</MenuItem>
        </Select>
      </FormControl>

      {/* Race Filters */}
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <FormControl fullWidth size="small">
          <InputLabel id="race-size-filter-label">Race Size</InputLabel>
          <Select
            labelId="race-size-filter-label"
            value="" // Manage state in parent
            label="Race Size"
            onChange={(e) => setRaceSizeFilter(e.target.value)}
          >
            <MenuItem value="">All Sizes</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Small">Small</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="race-speed-filter-label">Race Speed</InputLabel>
          <Select
            labelId="race-speed-filter-label"
            value="" // Manage state in parent
            label="Race Speed"
            onChange={(e) => setRaceSpeedFilter(e.target.value)}
          >
            <MenuItem value="">All Speeds</MenuItem>
            <MenuItem value="30">30 ft.</MenuItem>
            <MenuItem value="25">25 ft.</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Plane Filters */}
      <FormControl fullWidth size="small">
        <InputLabel id="plane-parent-filter-label">Plane Parent</InputLabel>
        <Select
          labelId="plane-parent-filter-label"
          value="" // Manage state in parent
          label="Plane Parent"
          onChange={(e) => setPlaneParentFilter(e.target.value)}
        >
          <MenuItem value="">All Planes</MenuItem>
          <MenuItem value="The Abyss">The Abyss</MenuItem>
          <MenuItem value="The Nine Hells">The Nine Hells</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;