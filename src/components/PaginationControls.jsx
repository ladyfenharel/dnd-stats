// src/components/PaginationControls.jsx
import React from 'react';
import { useSpells } from '../context/spellContext';
import { Button, Typography, Stack } from '@mui/material';
import { PaginationSkeleton } from './loading/PaginationSkeleton';

const PaginationControls = () => {
  const { loading, nextUrl, previousUrl, currentPage, goToNextPage, goToPreviousPage } = useSpells();

  if (loading) {
    return <PaginationSkeleton />;
  }

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'space-between', alignItems: 'center' }}>
      <Button onClick={goToPreviousPage} disabled={!previousUrl}>
        Previous
      </Button>
      <Typography variant="overline" component="span">
        Page: {currentPage}
      </Typography>
      <Button onClick={goToNextPage} disabled={!nextUrl}>
        Next
      </Button>
    </Stack>
  );
};

export default PaginationControls;
