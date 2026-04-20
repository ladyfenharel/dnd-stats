// src/components/Sidebar.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import PaginationControls from "./PaginationControls";

function Sidebar() {
    return (
        <Box sx={{ overflow: 'auto', padding: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Search Spells
            </Typography>
            <SearchBar />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Filter Spells
            </Typography>
            <FilterPanel />

            <Box sx={{ p: 2, mt: 'auto' }}>
                <PaginationControls />
            </Box>
        </Box>
    );
}

export default Sidebar;