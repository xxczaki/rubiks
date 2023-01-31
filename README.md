# Rubik's

> Rubik's Cube (3×3×3) implementation in TypeScript

## Features

- Cube transformations
    - X axis (front, back)
    - Y axis (left, right)
- Side rotation
    - Up, down (clockwise and counterclockwise)
    - Front, back (clockwise and counterclockwise)
    - Left, right (clockwise and counterclockwise)
- Scrambling
    - Ability to use a custom random number generator
    - Scramble sequence interpretation, e.g. `D B U B2 L F' R L`
- Emoji representation
- Move history

## Roadmap

- [ ] Z axis cube transformations (up, down)
- [ ] Solving
- [x] Moves history
- [ ] Resetting
    - [ ] By moves history
    - [ ] By algorithms
- [ ] Configuration validation
- [ ] Extensive documentation with visual examples
- [x] Website demo
- [ ] CLI demo
- [ ] Customizable color representations
- [ ] Performance optimization
- [ ] Benchmarks
- [x] Drop `immer` for 0 dependencies
- [ ] Truly random scrambling (cross-platform and/or customizable)

### License

MIT