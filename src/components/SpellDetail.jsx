import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box } from '@mui/material';

const SpellDetail = () => {
    const { slug } = useParams(); // Get slug from the URL
    const [spell, setSpell] = useState([]);

    useEffect(() => {
        const fetchSpellDetails = async () => {
            try {
                const response = await fetch(`https://api.open5e.com/v1/spells/${slug}`);
                const data = await response.json();
                setSpell(data);
            } catch (error) {
                console.error("Error fetching spell details:", error);
            }
        };

        fetchSpellDetails();
    }, [slug]);

    if (!spell) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">{spell.name}</Typography>
                <Typography variant="body1">Level: {spell.level}</Typography>
                <Typography variant="body1">School: {spell.school}</Typography>
                <Typography variant="body1">Casting Time: {spell.casting_time}</Typography>
                <Typography variant="body1">Range: {spell.range}</Typography>
                <Typography variant="body1">Description: {spell.desc}</Typography>
            </Paper>
        </Box>
    );
};

export default SpellDetail;

