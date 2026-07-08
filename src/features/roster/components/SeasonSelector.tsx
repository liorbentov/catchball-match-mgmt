import { Season } from '../types';
import { Button } from '../../../shared/components';
import { formatDate } from '../../../shared/utils';

interface SeasonSelectorProps {
  seasons: Season[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function SeasonSelector({ seasons, selectedId, onSelect, onAdd }: SeasonSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {seasons.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selectedId === s.id
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
          }`}
        >
          {s.name}
          {s.isActive && (
            <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
          )}
        </button>
      ))}
      <Button variant="ghost" size="sm" onClick={onAdd}>
        + Season
      </Button>
    </div>
  );
}

interface GameListProps {
  games: { id: string; opponent: string; date: string; isHome: boolean }[];
  onRemove: (id: string) => void;
}

export function GameList({ games, onRemove }: GameListProps) {
  if (games.length === 0) {
    return <p className="text-gray-400 text-sm">No games scheduled for this season.</p>;
  }
  return (
    <ul className="space-y-2">
      {games.map((g) => (
        <li
          key={g.id}
          className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
        >
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${g.isHome ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}`}>
              {g.isHome ? 'HOME' : 'AWAY'}
            </span>
            <span className="font-medium text-gray-800">vs {g.opponent}</span>
            <span className="text-gray-400">{formatDate(g.date)}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onRemove(g.id)}>
            🗑️
          </Button>
        </li>
      ))}
    </ul>
  );
}
