import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import { generateId } from '../../../shared/utils';
import { Move, MoveCategory, MovePath } from '../types';

const DEMO_MOVES: Move[] = [
  {
    id: 'm1',
    name: 'Fast Break Counter',
    description: 'Quick transition after a catch — two attackers sprint forward while center holds.',
    category: 'transition',
    tags: ['fast', 'counter'],
    paths: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm2',
    name: 'Cross-Court Serve',
    description: 'Serve diagonally to the far corner to exploit gaps in the opponent defense.',
    category: 'serve',
    tags: ['serve', 'diagonal'],
    paths: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm3',
    name: 'Catcher Setup',
    description: 'Catcher signals the direction before the defender throws to set up a quick catch.',
    category: 'catch',
    tags: ['catcher', 'coordination'],
    paths: [],
    createdAt: new Date().toISOString(),
  },
];

export function usePlanMoves() {
  const [moves, setMoves] = useLocalStorage<Move[]>('plan-moves', DEMO_MOVES);
  const [selectedMoveId, setSelectedMoveId] = useLocalStorage<string | null>('selected-move', null);

  const selectedMove = moves.find((m) => m.id === selectedMoveId) ?? null;

  function createMove(data: Omit<Move, 'id' | 'paths' | 'createdAt'>): Move {
    const newMove: Move = {
      ...data,
      id: generateId(),
      paths: [],
      createdAt: new Date().toISOString(),
    };
    setMoves((prev) => [...prev, newMove]);
    setSelectedMoveId(newMove.id);
    return newMove;
  }

  function updateMove(id: string, data: Partial<Omit<Move, 'id' | 'createdAt'>>) {
    setMoves((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  }

  function deleteMove(id: string) {
    setMoves((prev) => prev.filter((m) => m.id !== id));
    if (selectedMoveId === id) setSelectedMoveId(null);
  }

  function savePaths(moveId: string, paths: MovePath[]) {
    setMoves((prev) => prev.map((m) => (m.id === moveId ? { ...m, paths } : m)));
  }

  return {
    moves,
    selectedMove,
    selectedMoveId,
    setSelectedMoveId,
    createMove,
    updateMove,
    deleteMove,
    savePaths,
  };
}
