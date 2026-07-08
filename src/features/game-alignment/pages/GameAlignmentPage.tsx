import { useState } from 'react';
import { useGameAlignment } from '../hooks/useGameAlignment';
import { useRoster } from '../../roster/hooks/useRoster';
import { Court } from '../components/Court';
import { PositionSelector } from '../components/PositionSelector';
import { Button } from '../../../shared/components';

export function GameAlignmentPage() {
  const {
    alignments,
    activeAlignment,
    activeAlignmentId,
    setActiveAlignmentId,
    courtPositions,
    createAlignment,
    deleteAlignment,
    assignPlayer,
    clearPosition,
    clearAll,
  } = useGameAlignment();

  const { players } = useRoster();
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAlignmentName, setNewAlignmentName] = useState('');

  const assignedPlayerIds = activeAlignment?.assignments.map((a) => a.playerId) ?? [];
  const currentPositionAssignment = selectedPositionId
    ? activeAlignment?.assignments.find((a) => a.positionId === selectedPositionId)?.playerId
    : undefined;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newAlignmentName.trim()) return;
    createAlignment(newAlignmentName.trim());
    setNewAlignmentName('');
    setShowNewForm(false);
    setSelectedPositionId(null);
  }

  function handlePositionClick(positionId: string) {
    if (!activeAlignmentId) return;
    setSelectedPositionId((prev) => (prev === positionId ? null : positionId));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Game Alignment</h1>
        <p className="text-gray-500 mt-1">Set player positions on the catchball court.</p>
      </div>

      {/* Alignment selector */}
      <div className="flex flex-wrap items-center gap-2">
        {alignments.map((a) => (
          <div key={a.id} className="flex items-center gap-1">
            <button
              onClick={() => { setActiveAlignmentId(a.id); setSelectedPositionId(null); }}
              className={`px-3 py-1.5 rounded-l-full text-sm font-medium border transition-colors ${
                activeAlignmentId === a.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {a.name}
            </button>
            <button
              onClick={() => deleteAlignment(a.id)}
              className={`px-2 py-1.5 rounded-r-full text-sm border transition-colors ${
                activeAlignmentId === a.id
                  ? 'bg-indigo-700 text-white border-indigo-700 hover:bg-red-600 hover:border-red-600'
                  : 'bg-white text-gray-400 border-gray-300 hover:bg-red-50 hover:text-red-500 hover:border-red-300'
              }`}
              title="Delete alignment"
            >
              ×
            </button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setShowNewForm(true)}>
          + New Alignment
        </Button>
      </div>

      {showNewForm && (
        <form onSubmit={handleCreate} className="flex items-center gap-2 max-w-sm">
          <input
            type="text"
            autoFocus
            required
            placeholder="e.g. Game 1 Opening"
            value={newAlignmentName}
            onChange={(e) => setNewAlignmentName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button type="submit" size="sm">Create</Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => setShowNewForm(false)}>Cancel</Button>
        </form>
      )}

      {!activeAlignmentId ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-5xl mb-3">🏟️</span>
          <p className="text-lg font-medium">No alignment selected</p>
          <p className="text-sm">Create a new alignment to start positioning players.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Court */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{activeAlignment?.name}</h2>
              <Button variant="secondary" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
            <Court
              positions={courtPositions}
              assignments={activeAlignment?.assignments ?? []}
              players={players}
              onPositionClick={handlePositionClick}
              selectedPositionId={selectedPositionId}
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              Click a position slot to assign a player
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {selectedPositionId ? (
              <PositionSelector
                selectedPositionId={selectedPositionId}
                players={players}
                assignedPlayerIds={assignedPlayerIds}
                currentAssignment={currentPositionAssignment}
                onAssign={(playerId) => {
                  assignPlayer(selectedPositionId, playerId);
                  setSelectedPositionId(null);
                }}
                onClear={() => {
                  clearPosition(selectedPositionId);
                  setSelectedPositionId(null);
                }}
                onClose={() => setSelectedPositionId(null)}
              />
            ) : (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium text-gray-700 mb-3">Lineup Summary</h3>
                {(activeAlignment?.assignments.length ?? 0) === 0 ? (
                  <p className="text-gray-400 text-sm">No players assigned yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {activeAlignment?.assignments.map((a) => {
                      const p = players.find((x) => x.id === a.playerId);
                      const pos = courtPositions.find((x) => x.id === a.positionId);
                      if (!p || !pos) return null;
                      return (
                        <li key={a.positionId} className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                            {p.number}
                          </span>
                          <span className="font-medium text-gray-800">{p.name}</span>
                          <span className="ml-auto text-gray-400 text-xs">{pos.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}

            {/* Legend */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-medium text-gray-700 mb-3">Court Zones</h3>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-red-300" />Attack Zone — front row</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-orange-200" />Center — mid court</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-300" />Defense Zone — back row</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
