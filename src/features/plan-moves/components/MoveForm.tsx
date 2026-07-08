import { useState } from 'react';
import type { MoveCategory } from '../types';
import { Button } from '../../../shared/components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const CATEGORIES: MoveCategory[] = ['serve', 'catch', 'attack', 'defense', 'transition', 'set-play'];

interface MoveFormProps {
  onSubmit: (data: { name: string; description: string; category: MoveCategory; tags: string[] }) => void;
  onCancel: () => void;
}

export function MoveForm({ onSubmit, onCancel }: MoveFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MoveCategory>('attack');
  const [tagsInput, setTagsInput] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onSubmit({ name: name.trim(), description: description.trim(), category, tags });
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      variant="outlined"
      sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>New Move / Play</Typography>
      <TextField
        label="Name"
        required
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Lightning Strike"
      />
      <TextField
        label="Description"
        size="small"
        fullWidth
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the move strategy..."
      />
      <FormControl size="small" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value as MoveCategory)}
        >
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Tags (comma-separated)"
        size="small"
        fullWidth
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="fast, pressure, diagonal"
      />
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm">Create Move</Button>
      </Box>
    </Paper>
  );
}
