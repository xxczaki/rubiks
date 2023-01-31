import { type Sides, Colors } from './types.js';

const { RED, GREEN, BLUE, ORANGE, YELLOW, WHITE } = Colors;

export const INITIAL_STATE: Sides = {
  up: [
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE],
  ],
  down: [
    [YELLOW, YELLOW, YELLOW],
    [YELLOW, YELLOW, YELLOW],
    [YELLOW, YELLOW, YELLOW],
  ],
  front: [
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN],
  ],
  back: [
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE],
  ],
  left: [
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE],
  ],
  right: [
    [RED, RED, RED],
    [RED, RED, RED],
    [RED, RED, RED],
  ],
};

// Unused for now
export const OPPOSITE_MOVES = new Map([
  ['U', "U'"],
  ["U'", 'U'],
  ['U2', "U2'"],
  ["U2'", 'U2'],

  ['D', "D'"],
  ["D'", 'D'],
  ['D2', "D2'"],
  ["D2'", 'D2'],

  ['F', "F'"],
  ["F'", 'F'],
  ['F2', "F2'"],
  ["F2'", 'F2'],

  ['B', "B'"],
  ["B'", 'B'],
  ['B2', "B2'"],
  ["B2'", 'B2'],

  ['L', "L'"],
  ["L'", 'L'],
  ['L2', "L2'"],
  ["L2'", 'L2'],

  ['R', "R'"],
  ["R'", 'R'],
  ['R2', "R2'"],
  ["R2'", 'R2'],
]);
