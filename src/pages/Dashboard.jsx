// src/pages/Dashboard.jsx
import React from 'react';
import SpellList from '../components/SpellList';
import PaginationControls from '../components/PaginationControls';
import { Grid, Box, Paper } from '@mui/material';
import SpellsBySchoolChart from '../components/SpellsBySchoolChart';
import SpellsByLevelChart from '../components/SpellsByLevelChart';

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', flexGrow: 1, padding: 2, minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{ width: '100%'}}>

        <Grid item xs={12} md={12}>
          <Paper sx={{ width: '93%', p: 2, height: 350, display: 'flex', flexDirection: 'column' }}>
            <SpellsBySchoolChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <Paper sx={{ width: '93%', p: 2, height: 350, display: 'flex', flexDirection: 'column' }}>
            <SpellsByLevelChart />
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ width: '90%' }}>
          <SpellList />
        </Grid>

      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <PaginationControls />
      </Box>
    </Box>
  );
};

export default Dashboard;