import type { Player } from '../types';
import { getPositionColor, getPositionLabel } from '../../../shared/utils';
import { COURT_POSITIONS } from './courtConfig';

interface PositionSelectorProps {
  selectedPositionId: string | null;
  players: Player[];
  assignedPlayerIds: string[];
  currentAssignment?: string;
  onAssign: (playerId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function PositionSelector({
  selectedPositionId,
  players,
  assignedPlayerIds,
  currentAssignment,
  onAssign,
  onClear,
  onClose,
}: PositionSelectorProps) {
  const position = COURT_POSITIONS.find((p) => p.id === selectedPositionId);
  const availablePlayers = players.filter(
    (p) => p.isActive && (p.id === currentAssignment || !assignedPlayerIds.includes(p.id))
  );

  if (!position) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">{position.label}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
      </div>

      {currentAssignment && (
        <button
          onClick={onClear}
          className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-2"
        >
          <span>🗑️</span> Remove player
        </button>
      )}

      <div className="space-y-1 max-h-48 overflow-y-auto">
        {availablePlayers.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-2">No available players</p>
        )}
        {availablePlayers.map((p) => {
          const isAssigned = p.id === currentAssignment;
          return (
            <button
              key={p.id}
              onClick={() => onAssign(p.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2.5 transition-colors ${
                isAssigned
                  ? 'bg-indigo-50 border border-indigo-300 text-indigo-700'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: getPositionColor(p.position) }}
              >
                {p.number}
              </span>
              <span className="font-medium text-gray-800">{p.name}</span>
              <span className="ml-auto text-xs text-gray-400">
                {getPositionLabel(p.position)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
