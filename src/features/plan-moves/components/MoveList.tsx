import type { Move, MoveCategory } from '../types';
import { Button } from '../../../shared/components';

const CATEGORY_COLORS: Record<MoveCategory, string> = {
  serve: 'bg-purple-100 text-purple-700',
  catch: 'bg-green-100 text-green-700',
  attack: 'bg-red-100 text-red-700',
  defense: 'bg-blue-100 text-blue-700',
  transition: 'bg-orange-100 text-orange-700',
  'set-play': 'bg-indigo-100 text-indigo-700',
};

const CATEGORY_ICONS: Record<MoveCategory, string> = {
  serve: '🎯',
  catch: '🤝',
  attack: '⚡',
  defense: '🛡️',
  transition: '🔄',
  'set-play': '📌',
};

interface MoveListProps {
  moves: Move[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  filterCategory: MoveCategory | 'all';
  onFilterChange: (cat: MoveCategory | 'all') => void;
}

const CATEGORIES: (MoveCategory | 'all')[] = [
  'all', 'serve', 'catch', 'attack', 'defense', 'transition', 'set-play',
];

export function MoveList({
  moves,
  selectedId,
  onSelect,
  onDelete,
  filterCategory,
  onFilterChange,
}: MoveListProps) {
  const filtered = filterCategory === 'all'
    ? moves
    : moves.filter((m) => m.category === filterCategory);

  return (
    <div className="space-y-3">
      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-300'
            }`}
          >
            {cat === 'all' ? 'All' : `${CATEGORY_ICONS[cat]} ${cat}`}
          </button>
        ))}
      </div>

      {/* Move cards */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">No moves in this category.</p>
        )}
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`rounded-lg border p-3 cursor-pointer transition-all ${
              selectedId === m.id
                ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 text-sm">{m.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[m.category]}`}>
                    {CATEGORY_ICONS[m.category]} {m.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{m.description}</p>
                {m.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {m.tags.map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onDelete(m.id); }}
                className="flex-shrink-0 text-gray-400"
              >
                🗑️
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
