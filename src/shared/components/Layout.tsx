import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <Container component="main" maxWidth="xl" sx={{ flex: 1, py: 3, px: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Container>
      <Divider />
      <Box component="footer" sx={{ py: 1.5, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          CatchCoach &copy; {new Date().getFullYear()} — Catchball Match Management
        </Typography>
      </Box>
    </Box>
  );
}
