// Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Correct import for Outlet
import { Box, AppBar, Toolbar, Typography, Button, Drawer } from '@mui/material';
import Sidebar from '../components/Sidebar';

const drawerWidth = '25%';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            D&D Spell Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`, // ✅ This is the missing piece
          p: { xs: 2, md: 3 }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;