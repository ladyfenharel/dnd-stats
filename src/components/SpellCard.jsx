// src/components/SpellCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const SpellCard = ({ spell }) => {
  return (
    <Card
      component={Link}
      to={`/spells/${spell.slug}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        mb: 2,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">{spell.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Level {spell.level} {spell.school}
        </Typography>
        <Typography variant="body2">{spell.desc?.slice(0, 100)}...</Typography>
      </CardContent>
    </Card>
  );
};

export default SpellCard;
