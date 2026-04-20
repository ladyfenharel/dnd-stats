import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from '../pages/Dashboard';
import SpellDetail from '../pages/SpellDetail';
import React from 'react';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="spells/:slug" element={<SpellDetail />} />
        {/* Other routes as needed */}
      </Route>
    </Routes>
  );
};

export default Root;