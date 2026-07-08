export interface Move {
  id: string;
  name: string;
  description: string;
  category: MoveCategory;
  tags: string[];
  paths: MovePath[];
  createdAt: string;
}

export type MoveCategory =
  | 'serve'
  | 'catch'
  | 'attack'
  | 'defense'
  | 'transition'
  | 'set-play';

export interface MovePath {
  id: string;
  color: string;
  points: Point[];
  type: 'run' | 'pass' | 'throw';
  label?: string;
}

export interface Point {
  x: number; // 0-100
  y: number; // 0-100
}

export interface PlayDiagram {
  id: string;
  moveId: string;
  paths: MovePath[];
  annotations: Annotation[];
}

export interface Annotation {
  id: string;
  x: number;
  y: number;
  text: string;
}
