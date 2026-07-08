import { useState } from 'react';
import { usePlanMoves } from '../hooks/usePlanMoves';
import { MoveList } from '../components/MoveList';
import { MoveCanvas } from '../components/MoveCanvas';
import { MoveForm } from '../components/MoveForm';
import { Button } from '../../../shared/components';
import { MoveCategory, MovePath } from '../types';

export function PlanMovesPage() {
  const {
    moves,
    selectedMove,
    selectedMoveId,
    setSelectedMoveId,
    createMove,
    deleteMove,
    savePaths,
  } = usePlanMoves();

  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<MoveCategory | 'all'>('all');

  function handleCreateMove(data: {
    name: string;
    description: string;
    category: MoveCategory;
    tags: string[];
  }) {
    createMove(data);
    setShowForm(false);
  }

  function handlePathsChange(paths: MovePath[]) {
    if (!selectedMoveId) return;
    savePaths(selectedMoveId, paths);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plan Moves</h1>
        <p className="text-gray-500 mt-1">Create and visualize tactical plays for your team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Moves list (left column) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Playbook ({moves.length})</h2>
            <Button size="sm" onClick={() => setShowForm(true)}>+ New Move</Button>
          </div>

          {showForm && (
            <MoveForm
              onSubmit={handleCreateMove}
              onCancel={() => setShowForm(false)}
            />
          )}

          <MoveList
            moves={moves}
            selectedId={selectedMoveId}
            onSelect={setSelectedMoveId}
            onDelete={deleteMove}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
          />
        </div>

        {/* Canvas / detail (right column) */}
        <div className="lg:col-span-3 space-y-4">
          {!selectedMove ? (
            <div className="flex flex-col items-center justify-center h-80 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
              <span className="text-5xl mb-3">📋</span>
              <p className="font-medium">Select a move to edit its diagram</p>
              <p className="text-sm">or create a new one from the playbook</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedMove.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedMove.description}</p>
                  {selectedMove.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedMove.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="secondary" size="sm" onClick={() => setSelectedMoveId(null)}>
                  Close
                </Button>
              </div>

              <MoveCanvas
                paths={selectedMove.paths}
                onChange={handlePathsChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
