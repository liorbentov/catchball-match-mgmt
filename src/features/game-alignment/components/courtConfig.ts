import type { CourtPosition } from '../types';

// Standard catchball court positions (6v6 format)
// The court is divided into: attack zone (front), center, defense zone (back)
// Each team has positions on their half
export const COURT_POSITIONS: CourtPosition[] = [
  // Attack positions (front row)
  { id: 'atk-left', label: 'Attack Left', zone: 'attack', x: 20, y: 25 },
  { id: 'atk-center', label: 'Attack Center', zone: 'attack', x: 50, y: 20 },
  { id: 'atk-right', label: 'Attack Right', zone: 'attack', x: 80, y: 25 },

  // Center positions
  { id: 'ctr-left', label: 'Center Left', zone: 'center', x: 25, y: 50 },
  { id: 'ctr-right', label: 'Center Right', zone: 'center', x: 75, y: 50 },

  // Defense positions (back row)
  { id: 'def-left', label: 'Defense Left', zone: 'defense', x: 20, y: 75 },
  { id: 'def-center', label: 'Defense Center', zone: 'defense', x: 50, y: 80 },
  { id: 'def-right', label: 'Defense Right', zone: 'defense', x: 80, y: 75 },

  // Catcher position (outside the court boundary, typically behind opponent's line)
  { id: 'catcher-back', label: 'Catcher', zone: 'attack', x: 50, y: 7 },
];

export const ZONE_COLORS: Record<string, string> = {
  attack: 'rgba(239,68,68,0.15)',
  center: 'rgba(249,115,22,0.10)',
  defense: 'rgba(59,130,246,0.15)',
};
