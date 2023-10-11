import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff9100',
    },
    secondary: {
      main: '#1fb6ef',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    // button: {
    //   fontWeight: 600,
    // },
  },
};

export default createTheme(themeOptions);
