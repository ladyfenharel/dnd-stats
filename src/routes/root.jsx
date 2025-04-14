import React from "react";
import { Outlet, Link } from "react-router-dom";
import App from "../App";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

export default function Root() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
      {/* Sidebar with Filters */}
      <Sidebar />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
    </>
  );
}
