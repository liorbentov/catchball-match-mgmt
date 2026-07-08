import { useState } from 'react';
import { useRoster } from '../hooks/useRoster';
import { PlayerCard } from '../components/PlayerCard';
import { PlayerForm } from '../components/PlayerForm';
import { SeasonSelector, GameList } from '../components/SeasonSelector';
import { Button } from '../../../shared/components';
import { Player } from '../types';
import { generateId } from '../../../shared/utils';

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Roster Management</h1>
        <p className="text-gray-500 mt-1">Manage your squad and game schedule per season.</p>
      </div>

      {/* Season selector */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Seasons</h2>
        <SeasonSelector
          seasons={seasons}
          selectedId={selectedSeasonId}
          onSelect={setSelectedSeasonId}
          onAdd={() => setShowSeasonForm(true)}
        />
        {showSeasonForm && (
          <form onSubmit={handleAddSeason} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 max-w-sm">
            <h3 className="font-medium text-gray-800">New Season</h3>
            <input
              type="text"
              required
              placeholder="Season name"
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input type="date" required value={seasonStart} onChange={(e) => setSeasonStart(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
              <input type="date" required value={seasonEnd} onChange={(e) => setSeasonEnd(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowSeasonForm(false)}>Cancel</Button>
              <Button type="submit" size="sm">Add Season</Button>
            </div>
          </form>
        )}
      </section>

      {/* Games for season */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Games — {selectedSeason?.name}
          </h2>
          <Button size="sm" onClick={() => setShowGameForm(true)}>+ Add Game</Button>
        </div>
        {showGameForm && (
          <form onSubmit={handleAddGame} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 max-w-md">
            <h3 className="font-medium text-gray-800">Schedule Game</h3>
            <input
              type="text"
              required
              placeholder="Opponent name"
              value={gameOpponent}
              onChange={(e) => setGameOpponent(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <input type="date" required value={gameDate} onChange={(e) => setGameDate(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
              <input type="text" placeholder="Location" value={gameLocation} onChange={(e) => setGameLocation(e.target.value)} className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isHome" checked={gameIsHome} onChange={(e) => setGameIsHome(e.target.checked)} className="rounded" />
              <label htmlFor="isHome" className="text-sm text-gray-700">Home game</label>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowGameForm(false)}>Cancel</Button>
              <Button type="submit" size="sm">Schedule</Button>
            </div>
          </form>
        )}
        <GameList games={seasonGames} onRemove={removeGame} />
      </section>

      {/* Player roster */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Players ({players.length})
          </h2>
          <Button size="sm" onClick={() => setShowPlayerForm(true)}>+ Add Player</Button>
        </div>

        {showPlayerForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
            <h3 className="font-medium text-gray-800 mb-4">New Player</h3>
            <PlayerForm
              onSubmit={handleAddPlayer}
              onCancel={() => setShowPlayerForm(false)}
            />
          </div>
        )}

        {editingPlayer && (
          <div className="bg-white border border-indigo-300 rounded-lg p-4 max-w-md">
            <h3 className="font-medium text-gray-800 mb-4">Edit Player</h3>
            <PlayerForm
              initial={editingPlayer}
              onSubmit={handleEditPlayer}
              onCancel={() => setEditingPlayer(null)}
            />
          </div>
        )}

        <div className="space-y-3">
          {players.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              onEdit={setEditingPlayer}
              onRemove={removePlayer}
            />
          ))}
          {players.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No players yet. Add your first player!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
