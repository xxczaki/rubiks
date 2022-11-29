import {type Sides, Directions, RotationType} from './types.js';
import {INITIAL_STATE} from './constants.js';
import {rotateSideLeft, rotateSideRight, updateSideRow, sidesToEmoji} from './utils/index.js';

const {LEFT, RIGHT, FRONT, BACK} = Directions;
const {CLOCKWISE, COUNTERCLOCKWISE} = RotationType;

class Cube {
	#state: Sides;
	#moveAllowlist: Record<string, () => void>;
	#moveHistory: string[];

	constructor(initialState: Partial<Sides>) {
		this.#state = {...INITIAL_STATE, ...initialState};
		this.#moveAllowlist = {
			'U': () => {
				this.rotateUp(CLOCKWISE);
			},
			'U\'': () => {
				this.rotateUp(COUNTERCLOCKWISE);
			},
			'U2': () => {
				this.rotateUp(CLOCKWISE);
				this.rotateUp(CLOCKWISE);
			},
			'D': () => {
				this.rotateDown(CLOCKWISE);
			},
			'D\'': () => {
				this.rotateDown(COUNTERCLOCKWISE);
			},
			'D2': () => {
				this.rotateDown(CLOCKWISE);
				this.rotateDown(CLOCKWISE);
			},
			'F': () => {
				this.rotateFront(CLOCKWISE);
			},
			'F\'': () => {
				this.rotateFront(COUNTERCLOCKWISE);
			},
			'F2': () => {
				this.rotateFront(CLOCKWISE);
				this.rotateFront(CLOCKWISE);
			},
			'B': () => {
				this.rotateBack(CLOCKWISE);
			},
			'B\'': () => {
				this.rotateBack(COUNTERCLOCKWISE);
			},
			'B2': () => {
				this.rotateBack(CLOCKWISE);
				this.rotateBack(CLOCKWISE);
			},
			'L': () => {
				this.rotateLeft(CLOCKWISE);
			},
			'L\'': () => {
				this.rotateLeft(COUNTERCLOCKWISE);
			},
			'L2': () => {
				this.rotateLeft(CLOCKWISE);
				this.rotateLeft(CLOCKWISE);
			},
			'R': () => {
				this.rotateRight(CLOCKWISE);
			},
			'R\'': () => {
				this.rotateRight(COUNTERCLOCKWISE);
			},
			'R2': () => {
				this.rotateRight(CLOCKWISE);
				this.rotateRight(CLOCKWISE);
			}
		};
		this.#moveHistory = [];
	}

	get sides() {
		return this.#state;
	}

	#move(direction: Directions) {
		const {up, down, front, back, left, right} = this.#state;

		switch (direction) {
		case LEFT: {
			this.#state = {
				up: rotateSideLeft(up),
				down: rotateSideRight(down),
				front: left,
				back: right,
				left: back,
				right: front,
			};
			break;
		}

		case RIGHT: {
			this.#state = {
				up: rotateSideRight(up),
				down: rotateSideLeft(down),
				front: right,
				back: left,
				left: front,
				right: back,
			};
			break;
		}

		case FRONT: {
			this.#state = {
				up: rotateSideRight(rotateSideRight(back)),
				down: front,
				front: up,
				back: rotateSideLeft(rotateSideLeft(down)),
				left: rotateSideRight(left),
				right: rotateSideLeft(right),
			};
			break;
		}

		case BACK: {
			this.#state = {
				up: front,
				down: rotateSideLeft(rotateSideLeft(back)),
				front: down,
				back: rotateSideLeft(rotateSideLeft(up)),
				left: rotateSideLeft(left),
				right: rotateSideRight(right),
			};
			break;
		}

		default: {
			throw new TypeError('Unknown direction');
		}
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
		const {up, front, back, left, right} = this.#state;

		switch (type) {
		case CLOCKWISE: {
			this.#state = {
				...this.#state,
				up: rotateSideRight(up),
				front: updateSideRow(front, right, 0),
				back: updateSideRow(back, left, 0),
				left: updateSideRow(left, front, 0),
				right: updateSideRow(right, back, 0),
			};

			this.#moveHistory.push('U');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.#state = {
				...this.#state,
				up: rotateSideLeft(up),
				front: updateSideRow(front, left, 0),
				back: updateSideRow(back, right, 0),
				left: updateSideRow(left, back, 0),
				right: updateSideRow(right, front, 0),
			};

			this.#moveHistory.push('U\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	rotateDown(type: RotationType) {
		const {down, front, back, left, right} = this.#state;

		switch (type) {
		case CLOCKWISE: {
			this.#state = {
				...this.#state,
				down: rotateSideRight(down),
				front: updateSideRow(front, left, 2),
				back: updateSideRow(back, right, 2),
				left: updateSideRow(left, back, 2),
				right: updateSideRow(right, front, 2),
			};

			this.#moveHistory.push('D');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.#state = {
				...this.#state,
				down: rotateSideLeft(down),
				front: updateSideRow(front, right, 2),
				back: updateSideRow(back, left, 2),
				left: updateSideRow(left, front, 2),
				right: updateSideRow(right, back, 2),
			};

			this.#moveHistory.push('D\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	rotateFront(type: RotationType) {
		switch (type) {
		case CLOCKWISE: {
			this.moveFront();
			this.rotateDown(CLOCKWISE);
			this.moveBack();

			this.#moveHistory.push('F');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.moveFront();
			this.rotateDown(COUNTERCLOCKWISE);
			this.moveBack();

			this.#moveHistory.push('F\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	rotateBack(type: RotationType) {
		switch (type) {
		case CLOCKWISE: {
			this.moveFront();
			this.rotateUp(CLOCKWISE);
			this.moveBack();

			this.#moveHistory.push('B');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.moveFront();
			this.rotateUp(COUNTERCLOCKWISE);
			this.moveBack();

			this.#moveHistory.push('B\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	rotateLeft(type: RotationType) {
		switch (type) {
		case CLOCKWISE: {
			this.moveLeft();
			this.rotateFront(CLOCKWISE);
			this.moveRight();

			this.#moveHistory.push('L');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.moveLeft();
			this.rotateFront(COUNTERCLOCKWISE);
			this.moveRight();

			this.#moveHistory.push('L\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	rotateRight(type: RotationType) {
		switch (type) {
		case CLOCKWISE: {
			this.moveRight();
			this.rotateFront(CLOCKWISE);
			this.moveLeft();

			this.#moveHistory.push('R');
			break;
		}

		case COUNTERCLOCKWISE: {
			this.moveRight();
			this.rotateFront(COUNTERCLOCKWISE);
			this.moveLeft();

			this.#moveHistory.push('R\'');
			break;
		}

		default: {
			throw new TypeError('Unknown rotation type');
		}
		}
	}

	applyMoves(moves: string | string[]) {
		if (!Array.isArray(moves)) {
			moves = moves.trim().split(' ');
		}

		for (const move of moves) {
			if (move in this.#moveAllowlist) {
				this.#moveAllowlist[move]();
				continue;
			}

			throw new SyntaxError('Unknown move, aborting');
		}
	}

	scramble(amount = 25) {
		const allowedMoves = Object.keys(this.#moveAllowlist);
		const moves: string[] = [];

		while (amount--) {
			moves.push(allowedMoves[(Math.random() * allowedMoves.length) | 0]);
		}

		this.applyMoves(moves);
	}

	get emoji() {
		return sidesToEmoji(this.#state);
	}

	get history() {
		return this.#moveHistory;
	}
}

export default Cube;
