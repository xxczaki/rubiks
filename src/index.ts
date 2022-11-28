import { Colors, type Configuration, Directions, RotationType } from "./types.js";
import {produce} from 'immer';
import {rotateSideRight, rotateSideLeft} from "./utils/rotateSide.js";

const {RED, GREEN, BLUE, ORANGE, YELLOW, WHITE} = Colors;

const DEFAULT_CONFIGURATION: Configuration = {
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
    [RED, RED, RED],
    [RED, RED, RED],
    [RED, RED, RED],
  ],
  back: [
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE],
  ],
  left: [
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN],
  ],
  right: [
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE],
  ],
}

const {LEFT, RIGHT, FRONT, BACK} = Directions;
const {CLOCKWISE, COUNTERCLOCKWISE} = RotationType;

class Cube {
  #configuration: Configuration = DEFAULT_CONFIGURATION;
 
  constructor(configuration: Configuration = DEFAULT_CONFIGURATION) {
    this.#configuration = configuration;
  }
 
  get sides() {
	  return this.#configuration;
  }

  #move(direction: Directions) {
    const {up, down, front, back, left, right} = this.#configuration;

    switch (direction) {
      case LEFT:
        this.#configuration = {
          ...this.#configuration,
          front: left,
          back: right,
          left: back,
          right: front,
          up: rotateSideLeft(up),
          down: rotateSideRight(down),
        };
        break;
      case RIGHT:
        this.#configuration = {
          ...this.#configuration,
          front: right,
          back: left,
          left: front,
          right: back,
          up: rotateSideRight(up),
          down: rotateSideLeft(down),
        };
        break;
      case FRONT:
        this.#configuration = {
          ...this.#configuration,
          up: rotateSideRight(rotateSideRight(back)),
          down: rotateSideRight(rotateSideRight(front)),
          front: up,
          back: down,
          left: rotateSideRight(left),
          right: rotateSideLeft(right),
        };
        break;
      case BACK:
        this.#configuration = {
          ...this.#configuration,
          up: front,
          down: back,
          front: rotateSideLeft(rotateSideLeft(down)),
          back: rotateSideLeft(rotateSideLeft(up)),
          left: rotateSideLeft(left),
          right: rotateSideRight(right),
        };
        break;
    
      default:
        throw new TypeError('Unknown direction')
    } 
  }

  moveLeft() {
    this.#move(LEFT);
  }

  moveRight() {
    this.#move(RIGHT);
  }

  moveFront() {
    this.#move(FRONT);
  }

  moveBack() {
    this.#move(BACK);
  }

  rotateUp(type: RotationType) {
    const {up, front, back, left, right} = this.#configuration;

    switch (type) {
      case CLOCKWISE:
        this.#configuration = produce(this.#configuration, draft => {
          draft.up = rotateSideRight(up);
          draft.front[0] = right[0];
          draft.back[0] = left[0];
          draft.left[0] = front[0];
          draft.right[0] = back[0];
        });
        break;

      case COUNTERCLOCKWISE:
        this.#configuration = produce(this.#configuration, draft => {
          draft.up = rotateSideLeft(up);
          draft.front[0] = left[0];
          draft.back[0] = right[0];
          draft.left[0] = back[0];
          draft.right[0] = front[0];
        });
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }

  rotateDown(type: RotationType) {
    const {down, front, back, left, right} = this.#configuration;

    switch (type) {
      case CLOCKWISE:
        this.#configuration = produce(this.#configuration, draft => {
          draft.down = rotateSideLeft(down);
          draft.front[2] = right[2];
          draft.back[2] = left[2];
          draft.left[2] = front[2];
          draft.right[2] = back[2];
        });
        break;

      case COUNTERCLOCKWISE:
        this.#configuration = produce(this.#configuration, draft => {
          draft.down = rotateSideRight(down);
          draft.front[2] = left[2];
          draft.back[2] = right[2];
          draft.left[2] = back[2];
          draft.right[2] = front[2];
        });
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }

  rotateFront(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.moveFront();
        this.rotateDown(COUNTERCLOCKWISE);
        this.moveBack();
        break;

      case COUNTERCLOCKWISE:
        this.moveFront();
        this.rotateDown(CLOCKWISE);
        this.moveBack();
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }

  rotateBack(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.moveFront();
        this.rotateUp(COUNTERCLOCKWISE);
        this.moveBack();
        break;

      case COUNTERCLOCKWISE:
        this.moveFront();
        this.rotateUp(CLOCKWISE);
        this.moveBack();
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }

  rotateLeft(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.moveLeft();
        this.rotateFront(CLOCKWISE);
        this.moveRight();
        break;

      case COUNTERCLOCKWISE:
        this.moveLeft();
        this.rotateFront(COUNTERCLOCKWISE);
        this.moveRight();
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }

  rotateRight(type: RotationType) {
    switch (type) {
      case CLOCKWISE:
        this.moveRight();
        this.rotateFront(CLOCKWISE);
        this.moveLeft();
        break;

      case COUNTERCLOCKWISE:
        this.moveRight();
        this.rotateFront(COUNTERCLOCKWISE);
        this.moveLeft();
        break;
    
      default:
        throw new TypeError('Unknown rotation type')
    }
  }
}
 
export default Cube;