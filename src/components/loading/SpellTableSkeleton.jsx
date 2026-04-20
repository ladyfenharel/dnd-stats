import React from 'react';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ROWS = 8;

export function SpellTableSkeleton() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-busy="true" aria-label="Loading spells">
        <TableHead>
          <TableRow>
            <TableCell align="center">Compare</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">School</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">Range</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: ROWS }, (_, i) => (
            <TableRow key={i}>
              <TableCell align="center">
                <Skeleton variant="rounded" width={22} height={22} sx={{ mx: 'auto' }} animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width="70%" animation="wave" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={40} sx={{ ml: 'auto' }} animation="wave" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={72} sx={{ ml: 'auto' }} animation="wave" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="rounded" width={88} height={24} sx={{ ml: 'auto' }} animation="wave" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={56} sx={{ ml: 'auto' }} animation="wave" />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="rounded" width={88} height={24} sx={{ ml: 'auto' }} animation="wave" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
