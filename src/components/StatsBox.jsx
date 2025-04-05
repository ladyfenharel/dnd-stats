import React from "react";
import { Paper, Typography, Box, styled } from "@mui/material";
import { CountUp } from 'use-count-up'; // Import CountUp component

// Define a styled Paper component for a more visually distinct look
const StyledStatsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Increase padding
  borderRadius: theme.shape.borderRadius, // Use theme's border radius
  boxShadow: theme.shadows[3], // Add a more noticeable shadow
  backgroundColor: theme.palette.primary.dark, // Use a darker shade of primary
  color: theme.palette.primary.contrastText, // Ensure text is readable on the background
  textAlign: 'center', // Center the content
}));

// Define a styled Typography for the title
const TitleTypography = styled(Typography)(({ theme }) => ({
  variant: 'h5', // Make the title a bit larger
  component: 'h2',
  gutterBottom: true,
  color: theme.palette.primary.contrastText, // Ensure title is readable
}));

// Define a styled Typography for the count
const CountTypography = styled(Typography)(({ theme }) => ({
  variant: 'h3', // Make the count prominent
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.light, // Use a contrasting secondary color
}));

// Define a styled Typography for the label
const LabelTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle1',
  color: theme.palette.primary.contrastText,
  opacity: 0.8, // Slightly fade the label
}));

function StatsBox({ title, data, sx }) {
  return (
    <StyledStatsPaper sx={{ ...sx }}>
      <Box>
        <TitleTypography>{title}</TitleTypography>
        <CountTypography>
          <CountUp isCounting end={data.length} duration={1.5} /> {/* Animate the count */}
        </CountTypography>
        <LabelTypography>Total</LabelTypography>
      </Box>
    </StyledStatsPaper>
  );
}

export default StatsBox;