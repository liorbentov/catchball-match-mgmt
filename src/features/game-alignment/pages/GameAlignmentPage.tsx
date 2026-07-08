import { useState } from 'react';
import { useGameAlignment } from '../hooks/useGameAlignment';
import { useRoster } from '../../roster/hooks/useRoster';
import { Court } from '../components/Court';
import { Button } from '../../../shared/components';
import { getPositionColor } from '../../../shared/utils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const ALL_COURT_POSITIONS = [1, 2, 3, 4, 5, 6] as const;

export function GameAlignmentPage() {
  const {
    alignments,
    activeAlignment,
    activeAlignmentId,
    setActiveAlignmentId,
    createAlignment,
    deleteAlignment,
    assignPlayer,
    clearPosition,
    clearAll,
  } = useGameAlignment();

  const { players } = useRoster();
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAlignmentName, setNewAlignmentName] = useState('');

  const assignments = activeAlignment?.assignments ?? [];
  const assignedPlayerIds = new Set(assignments.map((a) => a.playerId));
  const activePlayers = players.filter((p) => p.isActive);
  const benchPlayers = activePlayers.filter((p) => !assignedPlayerIds.has(p.id));

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newAlignmentName.trim()) return;
    createAlignment(newAlignmentName.trim());
    setNewAlignmentName('');
    setShowNewForm(false);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Game Alignment</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Drag players from the bench onto the court to set their positions.
        </Typography>
      </Box>

      {/* Alignment selector */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
        {alignments.map((a) => (
          <Chip
            key={a.id}
            label={a.name}
            onClick={() => setActiveAlignmentId(a.id)}
            onDelete={() => deleteAlignment(a.id)}
            color={activeAlignmentId === a.id ? 'primary' : 'default'}
            variant={activeAlignmentId === a.id ? 'filled' : 'outlined'}
            clickable
          />
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
              <Button variant="secondary" size="sm" onClick={clearAll} disabled={assignments.length === 0}>
                Clear All
              </Button>
            </Box>
            <Court
              assignments={assignments}
              players={players}
              onPlayerDrop={(playerId, x, y) => assignPlayer(playerId, x, y)}
              onPlayerRemove={(playerId) => clearPosition(playerId)}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Drag players from the bench onto the court · Double-click a player to remove them
            </Typography>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              {/* Player bench */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                  Player Bench
                  {benchPlayers.length > 0 && (
                    <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({benchPlayers.length} available)
                    </Typography>
                  )}
                </Typography>
                {benchPlayers.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {activePlayers.length === 0 ? 'No active players in roster.' : 'All players are on the court.'}
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {benchPlayers.map((p) => (
                      <Box
                        key={p.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('playerId', p.id);
                          e.dataTransfer.effectAllowed = 'move';
                        }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.25,
                          cursor: 'grab',
                          borderRadius: 2,
                          px: 1,
                          py: 0.5,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: getPositionColor(p.position),
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            border: '2px solid',
                            borderColor: 'divider',
                            flexShrink: 0,
                          }}
                        >
                          {p.number}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {p.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>

              {/* Lineup summary */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                  Lineup Summary
                </Typography>
                {assignments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No players on court yet.</Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {ALL_COURT_POSITIONS.map((pos) => {
                      const assignment = assignments.find((a) => a.courtPosition === pos);
                      const player = assignment ? players.find((p) => p.id === assignment.playerId) : null;
                      return (
                        <Box key={pos} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              bgcolor: 'action.hover',
                              border: '1px solid',
                              borderColor: 'divider',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              color: 'text.secondary',
                              flexShrink: 0,
                            }}
                          >
                            {pos}
                          </Box>
                          {player ? (
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: getPositionColor(player.position),
                                fontSize: '0.7rem',
                                fontWeight: 700,
                              }}
                            >
                              {player.number}
                            </Avatar>
                          ) : (
                            <Typography variant="body2" color="text.disabled">—</Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Paper>

              {/* Position legend */}
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Position Guide</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                  {[
                    { pos: 4, label: 'Front Left' },
                    { pos: 3, label: 'Front Center' },
                    { pos: 2, label: 'Front Right' },
                    { pos: 5, label: 'Back Left' },
                    { pos: 6, label: 'Back Center' },
                    { pos: 1, label: 'Back Right' },
                  ].map(({ pos, label }) => (
                    <Box key={pos} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {pos}
                      </Box>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
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

