// Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="fixed" component="header">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="span">
            D&D Spell Explorer
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          width: '100%',
          p: { xs: 2, md: 3, lg: 4 },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
