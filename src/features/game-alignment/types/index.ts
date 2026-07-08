import type { Player } from '../../../shared/types';

export type { Player };

export interface PlayerAssignment {
  playerId: string;
  x: number; // 0–100 percent of court width
  y: number; // 0–100 percent of court height (0 = net, 100 = back line)
  courtPosition: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface GameAlignment {
  id: string;
  name: string;
  gameId?: string;
  assignments: PlayerAssignment[];
  createdAt: string;
}
