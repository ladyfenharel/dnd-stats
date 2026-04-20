// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useSpells } from '../context/spellContext';
import { TextField } from '@mui/material';

const SearchBar = ({ size = 'small' }) => {
  const { setSearchQuery } = useSpells();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <TextField
      value={query}
      onChange={handleSearch}
      label="Search spells"
      variant="outlined"
      size={size}
      margin="none"
      fullWidth
      inputProps={{ 'aria-label': 'Search spells by name' }}
    />
  );
};

export default SearchBar;
