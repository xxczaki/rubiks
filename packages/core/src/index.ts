import HistoryProxy from './HistoryProxy.js';
import Randomizer from './Randomizer.js';
import State from './State.js';
import { type Sides, MoveDirections, RotationType } from './types.js';
import { sidesToEmoji } from './utils/index.js';

const { LEFT, RIGHT, FRONT, BACK } = MoveDirections;
const { CLOCKWISE, COUNTERCLOCKWISE } = RotationType;

class Cube extends HistoryProxy {
  #state: State;
  #moveMap: Record<string, () => void>;
  #randomizer: Randomizer;

  constructor(initialState?: Partial<Sides>) {
    const state = new State(initialState);

    super(state);

    this.#state = state;
    this.#moveMap = {
      U: () => {
        this.rotateUp(CLOCKWISE);
      },
      "U'": () => {
        this.rotateUp(COUNTERCLOCKWISE);
      },
      U2: () => {
        this.rotateUp(CLOCKWISE);
        this.rotateUp(CLOCKWISE);
      },
      "U2'": () => {
        this.rotateUp(COUNTERCLOCKWISE);
        this.rotateUp(COUNTERCLOCKWISE);
      },
      D: () => {
        this.rotateDown(CLOCKWISE);
      },
      "D'": () => {
        this.rotateDown(COUNTERCLOCKWISE);
      },
      D2: () => {
        this.rotateDown(CLOCKWISE);
        this.rotateDown(CLOCKWISE);
      },
      "D2'": () => {
        this.rotateDown(COUNTERCLOCKWISE);
        this.rotateDown(COUNTERCLOCKWISE);
      },
      F: () => {
        this.rotateFront(CLOCKWISE);
      },
      "F'": () => {
        this.rotateFront(COUNTERCLOCKWISE);
      },
      F2: () => {
        this.rotateFront(CLOCKWISE);
        this.rotateFront(CLOCKWISE);
      },
      "F2'": () => {
        this.rotateFront(COUNTERCLOCKWISE);
        this.rotateFront(COUNTERCLOCKWISE);
      },
      B: () => {
        this.rotateBack(CLOCKWISE);
      },
      "B'": () => {
        this.rotateBack(COUNTERCLOCKWISE);
      },
      B2: () => {
        this.rotateBack(CLOCKWISE);
        this.rotateBack(CLOCKWISE);
      },
      "B2'": () => {
        this.rotateBack(COUNTERCLOCKWISE);
        this.rotateBack(COUNTERCLOCKWISE);
      },
      L: () => {
        this.rotateLeft(CLOCKWISE);
      },
      "L'": () => {
        this.rotateLeft(COUNTERCLOCKWISE);
      },
      L2: () => {
        this.rotateLeft(CLOCKWISE);
        this.rotateLeft(CLOCKWISE);
      },
      "L2'": () => {
        this.rotateLeft(COUNTERCLOCKWISE);
        this.rotateLeft(COUNTERCLOCKWISE);
      },
      R: () => {
        this.rotateRight(CLOCKWISE);
      },
      "R'": () => {
        this.rotateRight(COUNTERCLOCKWISE);
      },
      R2: () => {
        this.rotateRight(CLOCKWISE);
        this.rotateRight(CLOCKWISE);
      },
      "R2'": () => {
        this.rotateRight(COUNTERCLOCKWISE);
        this.rotateRight(COUNTERCLOCKWISE);
      },
    };
    this.#randomizer = new Randomizer(Object.keys(this.#moveMap));
  }

  get sides() {
    return this.#state.state;
  }

  get emoji() {
    return sidesToEmoji(this.#state.state);
  }

  moveLeft() {
    this.#state.move(LEFT);
  }

  moveRight() {
    this.#state.move(RIGHT);
  }

  moveFront() {
    this.#state.move(FRONT);
  }

  moveBack() {
    this.#state.move(BACK);
  }

  rotateUp(type: RotationType) {
    this.#state.rotateUp(type);
  }

  rotateDown(type: RotationType) {
    this.#state.rotateDown(type);
  }

  rotateFront(type: RotationType) {
    this.#state.rotateFront(type);
  }

  rotateBack(type: RotationType) {
    this.#state.rotateBack(type);
  }

  rotateLeft(type: RotationType) {
    this.#state.rotateLeft(type);
  }

  rotateRight(type: RotationType) {
    this.#state.rotateRight(type);
  }

  applyMoves(moves: string | string[]) {
    if (!Array.isArray(moves)) {
      moves = moves.trim().split(' ');
    }

    for (const move of moves) {
      if (move in this.#moveMap) {
        this.#moveMap[move]();
        continue;
      }

      throw new SyntaxError('Unknown move');
    }
  }

  scramble(amount = 25) {
    const moves = this.#randomizer.randomize(amount);

    this.applyMoves(moves);
  }
}

export default Cube;
