import React from "react";
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const capitalizeWords = (str) => {
    if (!str) return "";
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

function SpellList() {
    const outletContext = useOutletContext() || {};
    const { filteredSpells = [], loading } = useOutletContext() || {};

    if (loading) {
        return <p>Loading spells...</p>; // or a spinner if you're fancy
    }
    
    if (!filteredSpells.length) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="spell table">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3}>No spells found.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    
    // ✅ Only renders this part if filteredSpells.length > 0
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="spell table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>School</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredSpells.map((spell) => (
                        <TableRow key={spell.slug}>
                            <TableCell component="th" scope="row">
                                <Link to={`/spell/${spell.slug}`}>{spell.name}</Link>
                            </TableCell>
                            <TableCell>{spell.level === 0 ? 'Cantrip' : spell.level}</TableCell>
                            <TableCell>{capitalizeWords(spell.school)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default SpellList;
