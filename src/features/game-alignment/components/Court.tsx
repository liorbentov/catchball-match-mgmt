import { useRef } from 'react';
import type { Player, PlayerAssignment } from '../types';
import { getPositionColor } from '../../../shared/utils';

interface CourtProps {
  assignments: PlayerAssignment[];
  players: Player[];
  onPlayerDrop: (playerId: string, x: number, y: number) => void;
  onPlayerRemove: (playerId: string) => void;
}

// Position watermarks: label, center-x, center-y (in SVG viewBox units 0-100)
const POSITION_LABELS: { pos: number; x: number; y: number }[] = [
  { pos: 4, x: 16, y: 25 },
  { pos: 3, x: 50, y: 25 },
  { pos: 2, x: 84, y: 25 },
  { pos: 5, x: 16, y: 75 },
  { pos: 6, x: 50, y: 75 },
  { pos: 1, x: 84, y: 75 },
];

// Court boundary clamp limits (in % of the container).
// These match the SVG court border drawn at x=3/97 and y=5/95.
const CLAMP_X_MIN = 3;
const CLAMP_X_MAX = 97;
const CLAMP_Y_MIN = 5;
const CLAMP_Y_MAX = 95;

// Vertical zone boundary (must match getCourtPosition thresholds in courtConfig.ts)
const ZONE_X_LEFT = 33;
const ZONE_X_RIGHT = 66;

export function Court({ assignments, players, onPlayerDrop, onPlayerRemove }: CourtProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const playerId = e.dataTransfer.getData('playerId');
    if (!playerId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(CLAMP_X_MIN, Math.min(CLAMP_X_MAX, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(CLAMP_Y_MIN, Math.min(CLAMP_Y_MAX, ((e.clientY - rect.top) / rect.height) * 100));
    onPlayerDrop(playerId, x, y);
  }

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0 }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* SVG half-court background */}
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12,
            background: 'linear-gradient(180deg, #4338ca 0%, #4f46e5 40%, #6366f1 100%)',
            display: 'block',
          }}
        >
          {/* Court border */}
          <rect x="3" y="5" width="94" height="90" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.7" />

          {/* Net (center line) — thick, at top */}
          <line x1="0" y1="5" x2="100" y2="5" stroke="white" strokeWidth="1.5" strokeOpacity="0.9" />
          <text x="50" y="3.8" textAnchor="middle" fill="white" fontSize="2.8" fontWeight="bold" opacity="0.7">NET</text>

          {/* 3-metre attack line — dashed */}
          <line x1="3" y1="35" x2="97" y2="35" stroke="white" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="4,3" />
          <text x="1.5" y="34.2" textAnchor="end" fill="white" fontSize="2.4" opacity="0.55">3m</text>

          {/* Subtle mid-row divider (for visual position zone guidance) */}
          <line x1="3" y1="50" x2="97" y2="50" stroke="white" strokeWidth="0.3" strokeOpacity="0.15" strokeDasharray="2,4" />

          {/* Vertical zone dividers — aligned to getCourtPosition thresholds */}
          <line x1={ZONE_X_LEFT} y1="5" x2={ZONE_X_LEFT} y2="95" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />
          <line x1={ZONE_X_RIGHT} y1="5" x2={ZONE_X_RIGHT} y2="95" stroke="white" strokeWidth="0.3" strokeOpacity="0.1" />

          {/* Position watermarks */}
          {POSITION_LABELS.map(({ pos, x, y }) => (
            <text
              key={pos}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
              opacity="0.07"
            >
              {pos}
            </text>
          ))}
        </svg>

        {/* Player tokens (absolutely positioned over the SVG) */}
        {assignments.map((a) => {
          const player = players.find((p) => p.id === a.playerId);
          if (!player) return null;
          return (
            <div
              key={a.playerId}
              draggable
              onDragStart={(e) => { e.dataTransfer.setData('playerId', a.playerId); e.dataTransfer.effectAllowed = 'move'; }}
              onDoubleClick={() => onPlayerRemove(a.playerId)}
              title={`#${player.number} ${player.name} — Pos ${a.courtPosition}\nDouble-click to remove`}
              style={{
                position: 'absolute',
                left: `${a.x}%`,
                top: `${a.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: getPositionColor(player.position),
                border: '2.5px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: 'white',
                cursor: 'grab',
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              {player.number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

