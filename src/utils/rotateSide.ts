import type {Side} from '../types'

export function rotateSideRight(side: Side) {
  return transpose(side).map(row => row.reverse()) as Side;
}

export function rotateSideLeft(side: Side) {
  return transpose(side.map(row => [...row].reverse()) as Side);
}

function transpose(side: Side) {
  return side[0].map((_, index) => side.map(row => row[index])) as Side;
}