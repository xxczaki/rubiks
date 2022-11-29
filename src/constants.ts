import {Colors, type Configuration} from './types.js';

const {RED, GREEN, BLUE, ORANGE, YELLOW, WHITE} = Colors;

export const DEFAULT_CONFIGURATION: Configuration = {
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
