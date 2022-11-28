import Cube from './dist/index.js';

const cube = new Cube();

console.log(cube.sides);

cube.rotateUp('clockwise');
cube.rotateUp('clockwise');
cube.rotateRight('counterclockwise');
cube.rotateDown('clockwise');
cube.rotateFront('counterclockwise');

console.log(cube.sides);