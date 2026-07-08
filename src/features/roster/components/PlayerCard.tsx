import type { Player } from '../types';
import { getPositionColor, getPositionLabel } from '../../../shared/utils';
import { Button } from '../../../shared/components';

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onRemove: (id: string) => void;
}

export function PlayerCard({ player, onEdit, onRemove }: PlayerCardProps) {
  const posColor = getPositionColor(player.position);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
        style={{ backgroundColor: posColor }}
      >
        {player.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">{player.name}</div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
            style={{ backgroundColor: posColor }}
          >
            {getPositionLabel(player.position)}
          </span>
          {!player.isActive && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
              Inactive
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button variant="secondary" size="sm" onClick={() => onEdit(player)}>
          ✏️ Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onRemove(player.id)}>
          🗑️
        </Button>
      </div>
    </div>
  );
}
