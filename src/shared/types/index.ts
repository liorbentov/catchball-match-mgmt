export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  isActive: boolean;
  avatar?: string;
}

export const PLAYER_POSITIONS = ['antena', 'playmaker', 'libro', 'bench'] as const;

export type PlayerPosition = (typeof PLAYER_POSITIONS)[number];

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Game {
  id: string;
  seasonId: string;
  opponent: string;
  date: string;
  location: string;
  isHome: boolean;
  result?: GameResult;
}

export interface GameResult {
  homeScore: number;
  awayScore: number;
}
