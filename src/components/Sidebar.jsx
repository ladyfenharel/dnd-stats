import React from "react";
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";

const Sidebar = ({ searchTerm, handleSearch, levelFilterType, handleLevelFilterTypeChange, levelRange, handleLevelSliderChange }) => {
  return (
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
        </Box>
      )}
    </Paper>
  );
};

export default Sidebar;
