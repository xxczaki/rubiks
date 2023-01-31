export enum Colors {
  BLUE = 'blue',
  GREEN = 'green',
  ORANGE = 'orange',
  RED = 'red',
  WHITE = 'white',
  YELLOW = 'yellow',
}

type Piece = Colors;
type Row = [Piece, Piece, Piece];
export type Side = [Row, Row, Row];

export type Sides = {
  back: Side;
  down: Side;
  front: Side;
  left: Side;
  right: Side;
  up: Side;
};

export enum MoveDirections {
  BACK,
  FRONT,
  LEFT,
  RIGHT,
}

export type RotationDirections =
  | 'Back'
  | 'Down'
  | 'Front'
  | 'Left'
  | 'Right'
  | 'Up';

export enum RotationType {
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}
