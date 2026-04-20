// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import './index.css';
import { SpellProvider } from './context/SpellProvider';
import appTheme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <SpellProvider>
        <App />
      </SpellProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
