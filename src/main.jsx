// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { SpellProvider } from './context/SpellContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/dnd-stats">
      <SpellProvider>
        <App />
      </SpellProvider>
    </BrowserRouter>
  </React.StrictMode>
);