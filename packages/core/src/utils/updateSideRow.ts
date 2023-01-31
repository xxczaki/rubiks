import type { Side } from '../types';

export default function updateSideRow(
  oldRow: Side,
  newRow: Side,
  rowIndex: number
) {
  return oldRow.map((row, index) =>
    index === rowIndex ? newRow[rowIndex] : row
  ) as Side;
}
