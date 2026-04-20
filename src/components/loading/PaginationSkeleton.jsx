import React from 'react';
import { Stack, Skeleton } from '@mui/material';

export function PaginationSkeleton() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mt: 2, justifyContent: 'space-between', alignItems: 'center' }}
      aria-busy="true"
      aria-label="Loading pagination"
    >
      <Skeleton variant="rounded" width={100} height={36} animation="wave" />
      <Skeleton variant="text" width={72} height={28} animation="wave" />
      <Skeleton variant="rounded" width={100} height={36} animation="wave" />
    </Stack>
  );
}
