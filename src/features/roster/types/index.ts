import { Player, Season, Game } from '../../shared/types';

export type { Player, Season, Game };

export interface RosterEntry {
  playerId: string;
  gameId?: string;
  seasonId: string;
  status: 'available' | 'unavailable' | 'injured';
}
