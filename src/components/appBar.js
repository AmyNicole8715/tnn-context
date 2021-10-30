import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import  SetAppLanguage  from './setLanguage.js';

import SortByMenu from './sortBy';

// currently an app bar with title, a sort by menu, and a language menu


export default function NNTopBar() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: 'Bebas Neue', color: 'red' }}
          >
            Not Netflix
          </Typography>
          
          <SetAppLanguage />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SortByMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
