import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { generateId } from '../../../shared/utils';
import type { GameAlignment } from '../types';
import { getCourtPosition } from '../components/courtConfig';

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

  function assignPlayer(playerId: string, x: number, y: number) {
    if (!activeAlignmentId) return;
    const courtPosition = getCourtPosition(x, y);
    setAlignments((prev) =>
      prev.map((a) => {
        if (a.id !== activeAlignmentId) return a;
        const filtered = a.assignments.filter((s) => s.playerId !== playerId);
        return { ...a, assignments: [...filtered, { playerId, x, y, courtPosition }] };
      })
    );
  }

  function clearPosition(playerId: string) {
    if (!activeAlignmentId) return;
    setAlignments((prev) =>
      prev.map((a) =>
        a.id === activeAlignmentId
          ? { ...a, assignments: a.assignments.filter((s) => s.playerId !== playerId) }
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
    createAlignment,
    deleteAlignment,
    assignPlayer,
    clearPosition,
    clearAll,
  };
}
