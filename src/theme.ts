import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      dark: '#3730a3',
      light: '#818cf8',
    },
    secondary: {
      main: '#6366f1',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});
