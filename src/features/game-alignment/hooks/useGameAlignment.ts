import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { generateId } from '../../../shared/utils';
import type { GameAlignment } from '../types';
import { COURT_POSITIONS } from '../components/courtConfig';

export function useGameAlignment() {
  const [alignments, setAlignments] = useLocalStorage<GameAlignment[]>(
    'game-alignments',
    []
  );
  const [activeAlignmentId, setActiveAlignmentId] = useLocalStorage<string | null>(
    'active-alignment-id',
    null
  );

  const activeAlignment = alignments.find((a) => a.id === activeAlignmentId) ?? null;

  function createAlignment(name: string, gameId?: string): GameAlignment {
    const newAlignment: GameAlignment = {
      id: generateId(),
      name,
      gameId,
      assignments: [],
      createdAt: new Date().toISOString(),
    };
    setAlignments((prev) => [...prev, newAlignment]);
    setActiveAlignmentId(newAlignment.id);
    return newAlignment;
  }

  function deleteAlignment(id: string) {
    setAlignments((prev) => prev.filter((a) => a.id !== id));
    if (activeAlignmentId === id) {
      setActiveAlignmentId(null);
    }
  }

  function assignPlayer(positionId: string, playerId: string) {
    if (!activeAlignmentId) return;
    setAlignments((prev) =>
      prev.map((a) => {
        if (a.id !== activeAlignmentId) return a;
        const filtered = a.assignments.filter((x) => x.positionId !== positionId && x.playerId !== playerId);
        return {
          ...a,
          assignments: [...filtered, { positionId, playerId }],
        };
      })
    );
  }

  function clearPosition(positionId: string) {
    if (!activeAlignmentId) return;
    setAlignments((prev) =>
      prev.map((a) =>
        a.id === activeAlignmentId
          ? { ...a, assignments: a.assignments.filter((x) => x.positionId !== positionId) }
          : a
      )
    );
  }

  function clearAll() {
    if (!activeAlignmentId) return;
    setAlignments((prev) =>
      prev.map((a) =>
        a.id === activeAlignmentId ? { ...a, assignments: [] } : a
      )
    );
  }

  return {
    alignments,
    activeAlignment,
    activeAlignmentId,
    setActiveAlignmentId,
    courtPositions: COURT_POSITIONS,
    createAlignment,
    deleteAlignment,
    assignPlayer,
    clearPosition,
    clearAll,
  };
}
