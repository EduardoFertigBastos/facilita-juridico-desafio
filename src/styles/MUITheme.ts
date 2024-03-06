'use client';
import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const MUITheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4dabf5',
    },
    success: {
      main: green['400'],
    },
  },
});

export default MUITheme;
