import React from 'react';
import { Box, Skeleton } from '@mui/material';

/** Placeholder while the full spell corpus is fetched for charts. */
export function ChartDatasetSkeleton({ chartHeight = 320 }) {
  return (
    <Box
      sx={{ width: '100%' }}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading chart data"
    >
      <Skeleton variant="text" width="55%" height={36} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
      <Box
        sx={{
          width: '100%',
          minHeight: chartHeight,
          display: 'flex',
          gap: 2,
          alignItems: 'stretch',
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            flex: 1,
            height: chartHeight,
            borderRadius: 2,
          }}
        />
        <Box sx={{ width: { xs: 0, sm: 120 }, display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} variant="text" width="100%" height={20} animation="wave" />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
