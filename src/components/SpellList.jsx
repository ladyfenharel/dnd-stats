// src/components/SpellList.jsx
import React, { useMemo } from 'react'; // Import useMemo
import { useSpells } from '../context/SpellContext';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const capitalizeWords = (str) => {
    if (!str) {
        return "";
    }
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

const SpellList = () => {
    const { spells, loading } = useSpells();

    console.log('Spells in SpellList:', spells);

    const tableBody = useMemo(() => (
        <TableBody>
            {spells.map((spell) => (
                <TableRow
                    key={spell.slug}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {spell.name}
                    </TableCell>
                    <TableCell align="right">{spell.level}</TableCell>
                    <TableCell align="right">{capitalizeWords(spell.school)}</TableCell>
                    <TableCell align="right">{spell.range}</TableCell>
                    <TableCell align="right">
                        <Link to={`/spells/${spell.slug}`}>View Details</Link>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    ), [spells]); // Only re-create the table body if the 'spells' array changes

    if (loading) {
        return <Typography>Loading spells...</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Level</TableCell>
                        <TableCell align="right">School</TableCell>
                        <TableCell align="right">Range</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {tableBody} {/* Render the memoized table body */}
            </Table>
        </TableContainer>
    );
};

export default SpellList;