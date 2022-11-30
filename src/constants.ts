import {Colors, type RotationOptions, type Sides} from './types.js';

const {RED, GREEN, BLUE, ORANGE, YELLOW, WHITE} = Colors;

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

export const DEFAULT_ROTATION_OPTIONS: RotationOptions = {
	ignoreHistory: false,
};
