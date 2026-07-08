import { Player } from '../../../shared/types';

export type { Player };

export interface CourtPosition {
  id: string;
  label: string;
  zone: 'attack' | 'defense' | 'center';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface PlayerAssignment {
  positionId: string;
  playerId: string;
}

export interface GameAlignment {
  id: string;
  name: string;
  gameId?: string;
  assignments: PlayerAssignment[];
  createdAt: string;
}
