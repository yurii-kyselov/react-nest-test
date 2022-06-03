import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../components/Header';

function MainLayout() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}

export default MainLayout;
