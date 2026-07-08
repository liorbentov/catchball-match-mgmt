import { useState } from 'react';
import { useGameAlignment } from '../hooks/useGameAlignment';
import { useRoster } from '../../roster/hooks/useRoster';
import { Court } from '../components/Court';
import { PositionSelector } from '../components/PositionSelector';
import { Button } from '../../../shared/components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

export function GameAlignmentPage() {
  const {
    alignments,
    activeAlignment,
    activeAlignmentId,
    setActiveAlignmentId,
    courtPositions,
    createAlignment,
    deleteAlignment,
    assignPlayer,
    clearPosition,
    clearAll,
  } = useGameAlignment();

  const { players } = useRoster();
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAlignmentName, setNewAlignmentName] = useState('');

  const assignedPlayerIds = activeAlignment?.assignments.map((a) => a.playerId) ?? [];
  const currentPositionAssignment = selectedPositionId
    ? activeAlignment?.assignments.find((a) => a.positionId === selectedPositionId)?.playerId
    : undefined;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newAlignmentName.trim()) return;
    createAlignment(newAlignmentName.trim());
    setNewAlignmentName('');
    setShowNewForm(false);
    setSelectedPositionId(null);
  }

  function handlePositionClick(positionId: string) {
    if (!activeAlignmentId) return;
    setSelectedPositionId((prev) => (prev === positionId ? null : positionId));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Game Alignment</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Set player positions on the catchball court.
        </Typography>
      </Box>

      {/* Alignment selector */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
        {alignments.map((a) => (
          <Box key={a.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              label={a.name}
              onClick={() => { setActiveAlignmentId(a.id); setSelectedPositionId(null); }}
              onDelete={() => deleteAlignment(a.id)}
              color={activeAlignmentId === a.id ? 'primary' : 'default'}
              variant={activeAlignmentId === a.id ? 'filled' : 'outlined'}
              clickable
            />
          </Box>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setShowNewForm(true)}>
          + New Alignment
        </Button>
      </Box>

      {showNewForm && (
        <Box
          component="form"
          onSubmit={handleCreate}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: 400 }}
        >
          <TextField
            autoFocus
            required
            size="small"
            placeholder="e.g. Game 1 Opening"
            value={newAlignmentName}
            onChange={(e) => setNewAlignmentName(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button type="submit" size="sm">Create</Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => setShowNewForm(false)}>Cancel</Button>
        </Box>
      )}

      {!activeAlignmentId ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h2" component="span" sx={{ mb: 1.5 }}>🏟️</Typography>
          <Typography variant="h6">No alignment selected</Typography>
          <Typography variant="body2">Create a new alignment to start positioning players.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Court */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activeAlignment?.name}</Typography>
              <Button variant="secondary" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </Box>
            <Court
              positions={courtPositions}
              assignments={activeAlignment?.assignments ?? []}
              players={players}
              onPositionClick={handlePositionClick}
              selectedPositionId={selectedPositionId}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Click a position slot to assign a player
            </Typography>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {selectedPositionId ? (
                <PositionSelector
                  selectedPositionId={selectedPositionId}
                  players={players}
                  assignedPlayerIds={assignedPlayerIds}
                  currentAssignment={currentPositionAssignment}
                  onAssign={(playerId) => {
                    assignPlayer(selectedPositionId, playerId);
                    setSelectedPositionId(null);
                  }}
                  onClear={() => {
                    clearPosition(selectedPositionId);
                    setSelectedPositionId(null);
                  }}
                  onClose={() => setSelectedPositionId(null)}
                />
              ) : (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5 }}>Lineup Summary</Typography>
                  {(activeAlignment?.assignments.length ?? 0) === 0 ? (
                    <Typography variant="body2" color="text.secondary">No players assigned yet.</Typography>
                  ) : (
                    <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {activeAlignment?.assignments.map((a) => {
                        const p = players.find((x) => x.id === a.playerId);
                        const pos = courtPositions.find((x) => x.id === a.positionId);
                        if (!p || !pos) return null;
                        return (
                          <ListItem key={a.positionId} disablePadding sx={{ gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light', fontSize: '0.7rem', fontWeight: 700 }}>
                              {p.number}
                            </Avatar>
                            <ListItemText
                              primary={p.name}
                              secondary={pos.label}
                              slotProps={{
                                primary: { style: { fontSize: '0.875rem', fontWeight: 500 } },
                                secondary: { style: { fontSize: '0.75rem' } },
                              }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </Paper>
              )}

              {/* Legend */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5 }}>Court Zones</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[
                    { color: '#fca5a5', label: 'Attack Zone — front row' },
                    { color: '#fed7aa', label: 'Center — mid court' },
                    { color: '#93c5fd', label: 'Defense Zone — back row' },
                  ].map(({ color, label }) => (
                    <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: color, flexShrink: 0 }} />
                      <Typography variant="body2">{label}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
