import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/roster', label: 'Roster', icon: '👥' },
  { path: '/game-alignment', label: 'Game Alignment', icon: '🏟️' },
  { path: '/plan-moves', label: 'Plan Moves', icon: '📋' },
];

export function Navigation() {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ maxWidth: 'xl', width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 4 }}>
          <Typography variant="h6" component="span">🏐</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            CatchCoach
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={{ textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <Button
                  size="small"
                  sx={{
                    color: 'white',
                    bgcolor: isActive ? 'primary.dark' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                    fontWeight: isActive ? 700 : 500,
                    gap: 0.75,
                  }}
                >
                  <span>{item.icon}</span>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    {item.label}
                  </Box>
                </Button>
              )}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
