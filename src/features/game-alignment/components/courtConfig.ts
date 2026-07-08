// Standard catchball position numbering (volleyball-style rotation):
//   Front row (near net):  4 = left,  3 = center,  2 = right
//   Back row:              5 = left,  6 = center,   1 = right
//
// Coordinate space: x=0 left, x=100 right; y=0 net (top), y=100 back line (bottom)

export type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6;

export const COURT_POSITIONS = [
  { id: '4', number: 4, label: 'Front Left' },
  { id: '3', number: 3, label: 'Front Center' },
  { id: '2', number: 2, label: 'Front Right' },
  { id: '5', number: 5, label: 'Back Left' },
  { id: '6', number: 6, label: 'Back Center' },
  { id: '1', number: 1, label: 'Back Right' },
] as const;

export function getCourtPosition(x: number, y: number): CourtPosition {
  const isBackRow = y > 50;
  if (!isBackRow) {
    if (x < 33) return 4;
    if (x > 66) return 2;
    return 3;
  } else {
    if (x < 33) return 5;
    if (x > 66) return 1;
    return 6;
  }
}
