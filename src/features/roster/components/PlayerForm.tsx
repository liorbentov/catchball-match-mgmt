import { useState } from 'react';
import type { Player, PlayerPosition } from '../../../shared/types';
import { Button } from '../../../shared/components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { PLAYER_POSITIONS } from '../../../shared/types';

interface PlayerFormProps {
  initial?: Partial<Player>;
  onSubmit: (data: Omit<Player, 'id'>) => void;
  onCancel: () => void;
}

export function PlayerForm({ initial, onSubmit, onCancel }: PlayerFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [number, setNumber] = useState(String(initial?.number ?? ''));
  const [position, setPosition] = useState<PlayerPosition>(initial?.position ?? 'antena');
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !number) return;
    onSubmit({ name: name.trim(), number: Number(number), position, isActive });
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Full Name"
        required
        fullWidth
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
      />
      <TextField
        label="Jersey Number"
        required
        fullWidth
        size="small"
        type="number"
        slotProps={{ htmlInput: { min: 1, max: 99 } }}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="1–99"
      />
      <FormControl fullWidth size="small">
        <InputLabel>Position</InputLabel>
        <Select
          value={position}
          label="Position"
          onChange={(e) => setPosition(e.target.value as PlayerPosition)}
        >
          {PLAYER_POSITIONS.map((p) => (
            <MenuItem key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
        label="Active player"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 1 }}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Player</Button>
      </Box>
    </Box>
  );
}
