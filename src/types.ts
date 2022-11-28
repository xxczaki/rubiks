export enum Colors {
    RED = 'Red',
    GREEN = 'Green',
    BLUE = 'Blue',
    ORANGE = 'Orange',
    YELLOW = 'Yellow',
    WHITE = 'White',
}

type Row = [Colors, Colors, Colors];
export type Side = [
    Row,
    Row,
    Row,
]

export type Configuration = {
    up: Side;
    down: Side;
    front: Side;
    back: Side;
    left: Side;
    right: Side;
}

export enum Directions {
    RIGHT,
    LEFT,
    FRONT,
    BACK,
}

export enum RotationType {
    CLOCKWISE = 'clockwise',
    COUNTERCLOCKWISE = 'counterclockwise'
}