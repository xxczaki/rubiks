export enum Colors {
	RED = '🟥',
	GREEN = '🟩',
	BLUE = '🟦',
	ORANGE = '🟧',
	YELLOW = '🟨',
	WHITE = '⬜',
}

type Piece = Colors;
type Row = [Piece, Piece, Piece];
export type Side = [
	Row,
	Row,
	Row,
];

export type Sides = {
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

export type RotationOptions = {
	ignoreHistory: boolean;
}