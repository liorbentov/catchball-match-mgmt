import type { Player } from '../types';
import { getPositionColor, getPositionLabel } from '../../../shared/utils';
import { Button } from '../../../shared/components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onRemove: (id: string) => void;
}

export function PlayerCard({ player, onEdit, onRemove }: PlayerCardProps) {
  const posColor = getPositionColor(player.position);

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        '&:hover': { boxShadow: 2 },
        transition: 'box-shadow 0.2s',
      }}
    >
      <Avatar
        sx={{ bgcolor: posColor, fontWeight: 'bold', fontSize: '1rem', flexShrink: 0 }}
      >
        {player.number}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600 }} noWrap>{player.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Chip
            label={getPositionLabel(player.position)}
            size="small"
            sx={{ bgcolor: posColor, color: 'white', fontWeight: 500 }}
          />
          {!player.isActive && (
            <Chip label="Inactive" size="small" variant="outlined" color="default" />
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
        <Button variant="secondary" size="sm" onClick={() => onEdit(player)}>
          ✏️ Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onRemove(player.id)}>
          🗑️
        </Button>
      </Box>
    </Paper>
  );
}
