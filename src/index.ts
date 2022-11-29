import {produce} from 'immer';
import {type Configuration, Directions, RotationType} from './types.js';
import {rotateSideRight, rotateSideLeft} from './utils/rotateSide.js';
import {DEFAULT_CONFIGURATION} from './constants.js';

const {LEFT, RIGHT, FRONT, BACK} = Directions;
const {CLOCKWISE, COUNTERCLOCKWISE} = RotationType;

class Cube {
	#configuration: Configuration;

	constructor(configuration: Configuration = DEFAULT_CONFIGURATION) {
		this.#configuration = configuration;
	}

	get sides() {
		return this.#configuration;
	}

	#move(direction: Directions) {
		const {up, down, front, back, left, right} = this.#configuration;

		switch (direction) {
			case LEFT: {
				this.#configuration = {
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
				this.#configuration = {
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
				this.#configuration = {
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
				this.#configuration = {
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
		const {up, front, back, left, right} = this.#configuration;

		switch (type) {
			case CLOCKWISE: {
				this.#configuration = produce(this.#configuration, draft => {
					draft.up = rotateSideRight(up);
					draft.front[0] = right[0];
					draft.back[0] = left[0];
					draft.left[0] = front[0];
					draft.right[0] = back[0];
				});
				break;
			}

			case COUNTERCLOCKWISE: {
				this.#configuration = produce(this.#configuration, draft => {
					draft.up = rotateSideLeft(up);
					draft.front[0] = left[0];
					draft.back[0] = right[0];
					draft.left[0] = back[0];
					draft.right[0] = front[0];
				});
				break;
			}

			default: {
				throw new TypeError('Unknown rotation type');
			}
		}
	}

	rotateDown(type: RotationType) {
		const {down, front, back, left, right} = this.#configuration;

		switch (type) {
			case CLOCKWISE: {
				this.#configuration = produce(this.#configuration, draft => {
					draft.down = rotateSideRight(down);
					draft.front[2] = left[2];
					draft.back[2] = right[2];
					draft.left[2] = back[2];
					draft.right[2] = front[2];
				});
				break;
			}

			case COUNTERCLOCKWISE: {
				this.#configuration = produce(this.#configuration, draft => {
					draft.down = rotateSideLeft(down);
					draft.front[2] = right[2];
					draft.back[2] = left[2];
					draft.left[2] = front[2];
					draft.right[2] = back[2];
				});
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
				break;
			}

			case COUNTERCLOCKWISE: {
				this.moveFront();
				this.rotateDown(COUNTERCLOCKWISE);
				this.moveBack();
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
				break;
			}

			case COUNTERCLOCKWISE: {
				this.moveFront();
				this.rotateUp(COUNTERCLOCKWISE);
				this.moveBack();
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
				break;
			}

			case COUNTERCLOCKWISE: {
				this.moveLeft();
				this.rotateFront(COUNTERCLOCKWISE);
				this.moveRight();
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
				break;
			}

			case COUNTERCLOCKWISE: {
				this.moveRight();
				this.rotateFront(COUNTERCLOCKWISE);
				this.moveLeft();
				break;
			}

			default: {
				throw new TypeError('Unknown rotation type');
			}
		}
	}

	#getScrambleCommands() {
		return new Map([
			['U', () => {
				this.rotateUp(CLOCKWISE);
			}],
			['U\'', () => {
				this.rotateUp(COUNTERCLOCKWISE);
			}],
			['U2', () => {
				this.rotateUp(CLOCKWISE);
				this.rotateUp(CLOCKWISE);
			}],
			['D', () => {
				this.rotateDown(CLOCKWISE);
			}],
			['D\'', () => {
				this.rotateDown(COUNTERCLOCKWISE);
			}],
			['D2', () => {
				this.rotateDown(CLOCKWISE);
				this.rotateDown(CLOCKWISE);
			}],

			['F', () => {
				this.rotateFront(CLOCKWISE);
			}],
			['F\'', () => {
				this.rotateFront(COUNTERCLOCKWISE);
			}],
			['F2', () => {
				this.rotateFront(CLOCKWISE);
				this.rotateFront(CLOCKWISE);
			}],
			['B', () => {
				this.rotateBack(CLOCKWISE);
			}],
			['B\'', () => {
				this.rotateBack(COUNTERCLOCKWISE);
			}],
			['B2', () => {
				this.rotateBack(CLOCKWISE);
				this.rotateBack(CLOCKWISE);
			}],

			['L', () => {
				this.rotateLeft(CLOCKWISE);
			}],
			['L\'', () => {
				this.rotateLeft(COUNTERCLOCKWISE);
			}],
			['L2', () => {
				this.rotateLeft(CLOCKWISE);
				this.rotateLeft(CLOCKWISE);
			}],
			['R', () => {
				this.rotateRight(CLOCKWISE);
			}],
			['R\'', () => {
				this.rotateRight(COUNTERCLOCKWISE);
			}],
			['R2', () => {
				this.rotateRight(CLOCKWISE);
				this.rotateRight(CLOCKWISE);
			}],
		]);
	}

	applyScrambleSequence(sequence: string) {
		const sequenceArray = sequence.split(' ');
		const scrambleCommands = this.#getScrambleCommands();

		for (const command of sequenceArray) {
			if (!scrambleCommands.has(command)) {
				throw new SyntaxError('Unknown scramble command, aborting');
			}

			scrambleCommands.get(command)?.();
		}
	}

	scramble(moves = 25) {
		const scrambleCommands = this.#getScrambleCommands();
		const possibleMoves = [...scrambleCommands.keys()];
		let scrambleSequence = '';

		while (moves--) {
			scrambleSequence += `${possibleMoves[(Math.random() * possibleMoves.length) | 0]} `;
		}

		this.applyScrambleSequence(scrambleSequence.trim());
	}

	get emoji() {
		return `
${this.sides.up.map(row => {
		const stringified = row.join('');

		return stringified.padStart(stringified.length + 6, ' ');
	}).join('\n')}
${[...this.sides.left[0], ...this.sides.front[0], ...this.sides.right[0], ...this.sides.back[0]].join('')}
${[...this.sides.left[1], ...this.sides.front[1], ...this.sides.right[1], ...this.sides.back[2]].join('')}
${[...this.sides.left[2], ...this.sides.front[2], ...this.sides.right[2], ...this.sides.back[2]].join('')}
${this.sides.down.map(row => {
		const stringified = row.join('');

		return stringified.padStart(stringified.length + 6, ' ');
	}).join('\n')}
    `;
	}
}

export default Cube;
