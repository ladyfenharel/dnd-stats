// src/components/PaginationControls.jsx
import React from 'react';
import { useSpells } from '../context/SpellContext';
import { Button, Typography, Stack } from '@mui/material';

const PaginationControls = () => {
  const { loading, nextUrl, previousUrl, currentPage, goToNextPage, goToPreviousPage } = useSpells();

  if (loading) {
    return <Typography>Loading spells...</Typography>;
  }

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
      <Button onClick={goToPreviousPage} disabled={!previousUrl || loading}>
        Previous
      </Button>
      <Typography variant="overline">Page: {currentPage}</Typography>
      <Button onClick={goToNextPage} disabled={!nextUrl || loading}>
        Next
      </Button>
    </Stack>
  );
};

export default PaginationControls;