import type { Player } from '../types';
import { getPositionColor, getPositionLabel } from '../../../shared/utils';
import { COURT_POSITIONS } from './courtConfig';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface PositionSelectorProps {
  selectedPositionId: string | null;
  players: Player[];
  assignedPlayerIds: string[];
  currentAssignment?: string;
  onAssign: (playerId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function PositionSelector({
  selectedPositionId,
  players,
  assignedPlayerIds,
  currentAssignment,
  onAssign,
  onClear,
  onClose,
}: PositionSelectorProps) {
  const position = COURT_POSITIONS.find((p) => p.id === selectedPositionId);
  const availablePlayers = players.filter(
    (p) => p.isActive && (p.id === currentAssignment || !assignedPlayerIds.includes(p.id))
  );

  if (!position) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{position.label}</Typography>
        <IconButton size="small" onClick={onClose}>✕</IconButton>
      </Box>

      {currentAssignment && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          onClick={onClear}
          sx={{ justifyContent: 'flex-start', gap: 1 }}
        >
          🗑️ Remove player
        </Button>
      )}

      <List disablePadding sx={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {availablePlayers.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 1 }}>
            No available players
          </Typography>
        )}
        {availablePlayers.map((p) => {
          const isAssigned = p.id === currentAssignment;
          return (
            <ListItemButton
              key={p.id}
              onClick={() => onAssign(p.id)}
              selected={isAssigned}
              sx={{ borderRadius: 1.5, gap: 1.5, py: 0.75 }}
            >
              <Avatar
                sx={{ width: 28, height: 28, bgcolor: getPositionColor(p.position), fontSize: '0.75rem', fontWeight: 700 }}
              >
                {p.number}
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>{p.name}</Typography>
              <Typography variant="caption" color="text.secondary">{getPositionLabel(p.position)}</Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
