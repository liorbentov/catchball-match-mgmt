import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const features = [
  {
    path: '/roster',
    icon: '👥',
    title: 'Roster',
    description: 'Manage your squad and game schedule per season.',
    color: '#eef2ff',
    borderColor: '#c7d2fe',
    hoverColor: '#818cf8',
    iconBg: '#e0e7ff',
  },
  {
    path: '/game-alignment',
    icon: '🏟️',
    title: 'Game Alignment',
    description: 'Set player positions on the catchball court for each game.',
    color: '#f0fdf4',
    borderColor: '#bbf7d0',
    hoverColor: '#4ade80',
    iconBg: '#dcfce7',
  },
  {
    path: '/plan-moves',
    icon: '📋',
    title: 'Plan Moves',
    description: 'Create and visualize tactical plays for your team.',
    color: '#fff7ed',
    borderColor: '#fed7aa',
    hoverColor: '#fb923c',
    iconBg: '#ffedd5',
  },
];

export function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          🏐 CatchCoach
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your catchball coaching command center — manage your roster, plan alignments, and draw up plays.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((f) => (
          <Grid key={f.path} size={{ xs: 12, sm: 4 }}>
            <Card
              component={Link}
              to={f.path}
              elevation={1}
              sx={{
                textDecoration: 'none',
                bgcolor: f.color,
                border: `2px solid ${f.borderColor}`,
                borderRadius: 3,
                height: '100%',
                transition: 'box-shadow 0.2s, border-color 0.2s',
                '&:hover': {
                  boxShadow: 4,
                  borderColor: f.hoverColor,
                },
              }}
            >
              <CardActionArea sx={{ height: '100%', alignItems: 'flex-start' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: f.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {f.description}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 500, mt: 'auto' }}>
                    Open →
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
