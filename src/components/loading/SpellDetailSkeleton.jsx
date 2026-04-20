import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export function SpellDetailSkeleton() {
  return (
    <Box
      sx={{ mt: 2, maxWidth: 720 }}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading spell details"
    >
      <Skeleton variant="rounded" width={160} height={36} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="75%" height={48} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={28} sx={{ mb: 2 }} />
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="55%" />
      </Stack>
      <Skeleton variant="text" width={120} sx={{ mb: 1 }} />
      <Skeleton variant="rounded" width="100%" height={120} animation="wave" />
    </Box>
  );
}
