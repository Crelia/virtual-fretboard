// theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac5',
    },
    background: {
      default: '#121212', // The default background for the body
      paper: '#1e1e1e',   // Background color for surfaces like cards, containers
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    // You can customize typography here
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default darkTheme;
