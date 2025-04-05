import React from "react";
import SpellList from "./components/SpellList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            D&D 5e Spellbook
          </Typography>
        </Toolbar>
      </AppBar>
      <SpellList />
    </Box>
  );
}

export default App;