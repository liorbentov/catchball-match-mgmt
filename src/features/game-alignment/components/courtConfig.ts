// Standard catchball position numbering (volleyball-style rotation):
//   Front row (near net):  4 = left,  3 = center,  2 = right
//   Back row:              5 = left,  6 = center,   1 = right
//
// Coordinate space: x=0 left, x=100 right; y=0 net (top), y=100 back line (bottom)

export function getCourtPosition(x: number, y: number): 1 | 2 | 3 | 4 | 5 | 6 {
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
