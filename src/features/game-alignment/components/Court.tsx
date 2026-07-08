import { Player, CourtPosition, PlayerAssignment } from '../types';
import { getPositionColor } from '../../../shared/utils';

interface CourtProps {
  positions: CourtPosition[];
  assignments: PlayerAssignment[];
  players: Player[];
  onPositionClick: (positionId: string) => void;
  selectedPositionId: string | null;
}

export function Court({
  positions,
  assignments,
  players,
  onPositionClick,
  selectedPositionId,
}: CourtProps) {
  function getPlayerForPosition(positionId: string): Player | undefined {
    const a = assignments.find((a) => a.positionId === positionId);
    return a ? players.find((p) => p.id === a.playerId) : undefined;
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '130%' }}>
      {/* Court background */}
      <div
        className="absolute inset-0 rounded-xl border-4 border-indigo-400 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #4f46e5 0%, #6366f1 50%, #4f46e5 100%)',
        }}
      >
        {/* Court lines */}
        {/* Center line */}
        <div className="absolute left-0 right-0 border-t-2 border-white border-opacity-60" style={{ top: '50%' }} />
        {/* Attack zone line */}
        <div className="absolute left-0 right-0 border-t border-white border-opacity-30 border-dashed" style={{ top: '33%' }} />
        {/* Defense zone line */}
        <div className="absolute left-0 right-0 border-t border-white border-opacity-30 border-dashed" style={{ top: '67%' }} />

        {/* Zone labels */}
        <div className="absolute left-2 text-white text-opacity-50 text-xs font-medium" style={{ top: '16%' }}>
          ⚡ Attack Zone
        </div>
        <div className="absolute left-2 text-white text-opacity-50 text-xs font-medium" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          ⚪ Center
        </div>
        <div className="absolute left-2 text-white text-opacity-50 text-xs font-medium" style={{ top: '78%' }}>
          🛡️ Defense Zone
        </div>

        {/* Court name label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-opacity-10 text-6xl font-black pointer-events-none select-none">
          🏐
        </div>

        {/* Position slots */}
        {positions.map((pos) => {
          const player = getPlayerForPosition(pos.id);
          const isSelected = selectedPositionId === pos.id;

          return (
            <button
              key={pos.id}
              onClick={() => onPositionClick(pos.id)}
              title={pos.label}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all focus:outline-none ${
                isSelected
                  ? 'ring-4 ring-yellow-300 scale-110'
                  : 'hover:scale-105'
              } ${player ? 'border-white' : 'border-white border-opacity-60 border-dashed'}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                backgroundColor: player
                  ? getPositionColor(player.position)
                  : 'rgba(255,255,255,0.15)',
                color: player ? 'white' : 'rgba(255,255,255,0.7)',
              }}
            >
              {player ? player.number : '+'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
