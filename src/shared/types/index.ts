export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  isActive: boolean;
  avatar?: string;
}

export type PlayerPosition =
  | 'attacker'
  | 'defender'
  | 'catcher'
  | 'center'
  | 'bench';

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
