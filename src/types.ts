export enum Colors {
	RED = '🟥',
	GREEN = '🟩',
	BLUE = '🟦',
	ORANGE = '🟧',
	YELLOW = '🟨',
	WHITE = '⬜',
}

type Row = [Colors, Colors, Colors];
export type Side = [
	Row,
	Row,
	Row,
];

export type Configuration = {
	up: Side;
	down: Side;
	front: Side;
	back: Side;
	left: Side;
	right: Side;
};

export enum Directions {
	RIGHT,
	LEFT,
	FRONT,
	BACK,
}

export enum RotationType {
	CLOCKWISE = 'clockwise',
	COUNTERCLOCKWISE = 'counterclockwise',
}
