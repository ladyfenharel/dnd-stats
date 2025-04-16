// src/components/SearchBar.jsx
import React from 'react';
import { useState } from 'react';
import { useSpells } from '../context/SpellContext';
import { TextField } from '@mui/material';

const SearchBar = () => {
  const context = useSpells();
  console.log('Spell Context in SearchBar:', context); // Add this line
  const { setSearchQuery } = context || {}; // Use optional chaining to avoid errors if context is undefined
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    } else {
      console.warn('setSearchQuery is not available in the context!');
    }
  };

  return (
    <TextField
      value={query}
      onChange={handleSearch}
      label="Search Spells"
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
};

export default SearchBar;