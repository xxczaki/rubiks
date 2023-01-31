import { INITIAL_STATE } from './constants.js';
import { type Sides, MoveDirections, RotationType } from './types.js';
import {
  rotateSideLeft,
  rotateSideRight,
  updateSideRow,
} from './utils/index.js';

const { LEFT, RIGHT, FRONT, BACK } = MoveDirections;
const { CLOCKWISE, COUNTERCLOCKWISE } = RotationType;

class State {
  #state: Sides;

  constructor(initialState?: Partial<Sides>) {
    this.#state = { ...INITIAL_STATE, ...initialState };
  }

  get state() {
    return this.#state;
  }

  move(direction: MoveDirections) {
    const { up, down, front, back, left, right } = this.#state;

    switch (direction) {
      case LEFT:
        this.#state = {
          up: rotateSideLeft(up),
          down: rotateSideRight(down),
          front: left,
          back: right,
          left: back,
          right: front,
        };
        break;
      case RIGHT:
        this.#state = {
          up: rotateSideRight(up),
          down: rotateSideLeft(down),
          front: right,
          back: left,
          left: front,
          right: back,
        };
        break;
      case FRONT:
        this.#state = {
          up: rotateSideRight(rotateSideRight(back)),
          down: front,
          front: up,
          back: rotateSideLeft(rotateSideLeft(down)),
          left: rotateSideRight(left),
          right: rotateSideLeft(right),
        };
        break;
      case BACK:
        this.#state = {
          up: front,
          down: rotateSideLeft(rotateSideLeft(back)),
          front: down,
          back: rotateSideLeft(rotateSideLeft(up)),
          left: rotateSideLeft(left),
          right: rotateSideRight(right),
        };
        break;
      default:
        throw new TypeError('Unknown direction');
    }
  }

  rotateUp(type: RotationType) {
    const { up, front, back, left, right } = this.#state;

    switch (type) {
      case CLOCKWISE:
        this.#state = {
          ...this.#state,
          up: rotateSideRight(up),
          front: updateSideRow(front, right, 0),
          back: updateSideRow(back, left, 0),
          left: updateSideRow(left, front, 0),
          right: updateSideRow(right, back, 0),
        };
        break;
      case COUNTERCLOCKWISE:
        this.#state = {
          ...this.#state,
          up: rotateSideLeft(up),
          front: updateSideRow(front, left, 0),
          back: updateSideRow(back, right, 0),
          left: updateSideRow(left, back, 0),
          right: updateSideRow(right, front, 0),
        };
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }

  rotateDown(type: RotationType) {
    const { down, front, back, left, right } = this.#state;

    switch (type) {
      case CLOCKWISE:
        this.#state = {
          ...this.#state,
          down: rotateSideRight(down),
          front: updateSideRow(front, left, 2),
          back: updateSideRow(back, right, 2),
          left: updateSideRow(left, back, 2),
          right: updateSideRow(right, front, 2),
        };
        break;
      case COUNTERCLOCKWISE:
        this.#state = {
          ...this.#state,
          down: rotateSideLeft(down),
          front: updateSideRow(front, right, 2),
          back: updateSideRow(back, left, 2),
          left: updateSideRow(left, front, 2),
          right: updateSideRow(right, back, 2),
        };
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }

  rotateFront(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.move(FRONT);
        this.rotateDown(CLOCKWISE);
        this.move(BACK);
        break;
      case COUNTERCLOCKWISE:
        this.move(FRONT);
        this.rotateDown(COUNTERCLOCKWISE);
        this.move(BACK);
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }

  rotateBack(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.move(FRONT);
        this.rotateUp(CLOCKWISE);
        this.move(BACK);
        break;
      case COUNTERCLOCKWISE:
        this.move(FRONT);
        this.rotateUp(COUNTERCLOCKWISE);
        this.move(BACK);
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }

  rotateLeft(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.move(LEFT);
        this.rotateFront(CLOCKWISE);
        this.move(RIGHT);
        break;
      case COUNTERCLOCKWISE:
        this.move(LEFT);
        this.rotateFront(COUNTERCLOCKWISE);
        this.move(RIGHT);
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }

  rotateRight(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.move(RIGHT);
        this.rotateFront(CLOCKWISE);
        this.move(LEFT);
        break;

      case COUNTERCLOCKWISE:
        this.move(RIGHT);
        this.rotateFront(COUNTERCLOCKWISE);
        this.move(LEFT);
        break;
      default:
        throw new TypeError('Unknown rotation type');
    }
  }
}

export default State;
