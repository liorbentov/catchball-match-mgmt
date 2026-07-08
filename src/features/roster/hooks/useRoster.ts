import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { generateId } from '../../../shared/utils';
import type { Player, Season, Game } from '../types';

const DEMO_SEASON: Season = {
  id: 'season-1',
  name: 'Summer 2025',
  startDate: '2025-06-01',
  endDate: '2025-08-31',
  isActive: true,
};

const DEMO_PLAYERS: Player[] = []

const DEMO_GAMES: Game[] = []

export function useRoster() {
  const [players, setPlayers] = useLocalStorage<Player[]>('roster-players', DEMO_PLAYERS);
  const [seasons, setSeasons] = useLocalStorage<Season[]>('roster-seasons', [DEMO_SEASON]);
  const [games, setGames] = useLocalStorage<Game[]>('roster-games', DEMO_GAMES);
  const [selectedSeasonId, setSelectedSeasonId] = useLocalStorage<string>(
    'roster-selected-season',
    DEMO_SEASON.id
  );

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId) ?? seasons[0];
  const seasonGames = games.filter((g) => g.seasonId === selectedSeasonId);
  const activePlayers = players.filter((p) => p.isActive);

  function addPlayer(data: Omit<Player, 'id'>) {
    setPlayers((prev) => [...prev, { ...data, id: generateId() }]);
  }

  function updatePlayer(id: string, data: Partial<Player>) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  function removePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function addSeason(data: Omit<Season, 'id'>) {
    const newSeason = { ...data, id: generateId() };
    setSeasons((prev) => [...prev, newSeason]);
    return newSeason;
  }

  function addGame(data: Omit<Game, 'id'>) {
    setGames((prev) => [...prev, { ...data, id: generateId() }]);
  }

  function removeGame(id: string) {
    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  return {
    players,
    activePlayers,
    seasons,
    selectedSeason,
    selectedSeasonId,
    setSelectedSeasonId,
    seasonGames,
    games,
    addPlayer,
    updatePlayer,
    removePlayer,
    addSeason,
    addGame,
    removeGame,
  };
}
