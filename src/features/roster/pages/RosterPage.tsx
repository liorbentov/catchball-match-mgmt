import { useState } from 'react';
import { useRoster } from '../hooks/useRoster';
import { PlayerCard } from '../components/PlayerCard';
import { PlayerForm } from '../components/PlayerForm';
import { SeasonSelector, GameList } from '../components/SeasonSelector';
import { Button } from '../../../shared/components';
import type { Player } from '../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

export function RosterPage() {
  const {
    players,
    seasons,
    selectedSeason,
    selectedSeasonId,
    setSelectedSeasonId,
    seasonGames,
    addPlayer,
    updatePlayer,
    removePlayer,
    addSeason,
    addGame,
    removeGame,
  } = useRoster();

  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showGameForm, setShowGameForm] = useState(false);
  const [showSeasonForm, setShowSeasonForm] = useState(false);

  // Game form state
  const [gameOpponent, setGameOpponent] = useState('');
  const [gameDate, setGameDate] = useState('');
  const [gameLocation, setGameLocation] = useState('');
  const [gameIsHome, setGameIsHome] = useState(true);

  // Season form state
  const [seasonName, setSeasonName] = useState('');
  const [seasonStart, setSeasonStart] = useState('');
  const [seasonEnd, setSeasonEnd] = useState('');

  function handleAddPlayer(data: Omit<Player, 'id'>) {
    addPlayer(data);
    setShowPlayerForm(false);
  }

  function handleEditPlayer(data: Omit<Player, 'id'>) {
    if (editingPlayer) {
      updatePlayer(editingPlayer.id, data);
      setEditingPlayer(null);
    }
  }

  function handleAddGame(e: React.FormEvent) {
    e.preventDefault();
    if (!gameOpponent.trim() || !gameDate) return;
    addGame({
      seasonId: selectedSeasonId,
      opponent: gameOpponent.trim(),
      date: gameDate,
      location: gameLocation.trim() || 'TBD',
      isHome: gameIsHome,
    });
    setGameOpponent('');
    setGameDate('');
    setGameLocation('');
    setShowGameForm(false);
  }

  function handleAddSeason(e: React.FormEvent) {
    e.preventDefault();
    if (!seasonName.trim() || !seasonStart || !seasonEnd) return;
    const s = addSeason({ name: seasonName.trim(), startDate: seasonStart, endDate: seasonEnd, isActive: false });
    setSelectedSeasonId(s.id);
    setSeasonName('');
    setSeasonStart('');
    setSeasonEnd('');
    setShowSeasonForm(false);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Roster Management</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage your squad and game schedule per season.
        </Typography>
      </Box>

      {/* Season selector */}
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Seasons</Typography>
        <SeasonSelector
          seasons={seasons}
          selectedId={selectedSeasonId}
          onSelect={setSelectedSeasonId}
          onAdd={() => setShowSeasonForm(true)}
        />
        {showSeasonForm && (
          <Paper
            component="form"
            onSubmit={handleAddSeason}
            variant="outlined"
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 360, borderRadius: 2 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>New Season</Typography>
            <TextField
              label="Season name"
              required
              size="small"
              fullWidth
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Start date"
                type="date"
                required
                size="small"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={seasonStart}
                onChange={(e) => setSeasonStart(e.target.value)}
              />
              <TextField
                label="End date"
                type="date"
                required
                size="small"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={seasonEnd}
                onChange={(e) => setSeasonEnd(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowSeasonForm(false)}>Cancel</Button>
              <Button type="submit" size="sm">Add Season</Button>
            </Box>
          </Paper>
        )}
      </Box>

      <Divider />

      {/* Games for season */}
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Games — {selectedSeason?.name}
          </Typography>
          <Button size="sm" onClick={() => setShowGameForm(true)}>+ Add Game</Button>
        </Box>
        {showGameForm && (
          <Paper
            component="form"
            onSubmit={handleAddGame}
            variant="outlined"
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 460, borderRadius: 2 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Schedule Game</Typography>
            <TextField
              label="Opponent name"
              required
              size="small"
              fullWidth
              value={gameOpponent}
              onChange={(e) => setGameOpponent(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                label="Date"
                type="date"
                required
                size="small"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={gameDate}
                onChange={(e) => setGameDate(e.target.value)}
              />
              <TextField
                label="Location"
                size="small"
                fullWidth
                value={gameLocation}
                onChange={(e) => setGameLocation(e.target.value)}
                placeholder="TBD"
              />
            </Box>
            <FormControlLabel
              control={
                <Checkbox checked={gameIsHome} onChange={(e) => setGameIsHome(e.target.checked)} size="small" />
              }
              label="Home game"
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowGameForm(false)}>Cancel</Button>
              <Button type="submit" size="sm">Schedule</Button>
            </Box>
          </Paper>
        )}
        <GameList games={seasonGames} onRemove={removeGame} />
      </Box>

      <Divider />

      {/* Player roster */}
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Players ({players.length})
          </Typography>
          <Button size="sm" onClick={() => setShowPlayerForm(true)}>+ Add Player</Button>
        </Box>

        {showPlayerForm && (
          <Paper variant="outlined" sx={{ p: 2, maxWidth: 460, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>New Player</Typography>
            <PlayerForm
              onSubmit={handleAddPlayer}
              onCancel={() => setShowPlayerForm(false)}
            />
          </Paper>
        )}

        {editingPlayer && (
          <Paper variant="outlined" sx={{ p: 2, maxWidth: 460, borderRadius: 2, borderColor: 'primary.light' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>Edit Player</Typography>
            <PlayerForm
              initial={editingPlayer}
              onSubmit={handleEditPlayer}
              onCancel={() => setEditingPlayer(null)}
            />
          </Paper>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {players.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              onEdit={setEditingPlayer}
              onRemove={removePlayer}
            />
          ))}
          {players.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No players yet. Add your first player!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
