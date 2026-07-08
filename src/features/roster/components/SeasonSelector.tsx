import type { Season } from '../types';
import { Button } from '../../../shared/components';
import { formatDate } from '../../../shared/utils';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

interface SeasonSelectorProps {
  seasons: Season[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function SeasonSelector({ seasons, selectedId, onSelect, onAdd }: SeasonSelectorProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
      {seasons.map((s) => (
        <Chip
          key={s.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {s.name}
              {s.isActive && (
                <Box
                  component="span"
                  sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4ade80', display: 'inline-block' }}
                />
              )}
            </Box>
          }
          onClick={() => onSelect(s.id)}
          color={selectedId === s.id ? 'primary' : 'default'}
          variant={selectedId === s.id ? 'filled' : 'outlined'}
          clickable
        />
      ))}
      <Button variant="ghost" size="sm" onClick={onAdd}>
        + Season
      </Button>
    </Box>
  );
}

interface GameListProps {
  games: { id: string; opponent: string; date: string; isHome: boolean }[];
  onRemove: (id: string) => void;
}

export function GameList({ games, onRemove }: GameListProps) {
  if (games.length === 0) {
    return <Typography variant="body2" color="text.secondary">No games scheduled for this season.</Typography>;
  }
  return (
    <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {games.map((g) => (
        <ListItem
          key={g.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
            px: 2,
            py: 1,
          }}
          secondaryAction={
            <IconButton size="small" edge="end" onClick={() => onRemove(g.id)} title="Remove">
              🗑️
            </IconButton>
          }
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              label={g.isHome ? 'HOME' : 'AWAY'}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: '0.65rem',
                bgcolor: g.isHome ? '#e0e7ff' : '#ffedd5',
                color: g.isHome ? '#4338ca' : '#c2410c',
              }}
            />
            <ListItemText
              primary={`vs ${g.opponent}`}
              secondary={formatDate(g.date)}
              slotProps={{
                primary: { style: { fontWeight: 500, fontSize: '0.875rem' } },
                secondary: { style: { fontSize: '0.75rem' } },
              }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
}
