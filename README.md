![Header image](https://user-images.githubusercontent.com/22645979/204383922-c7a57142-9857-40a9-b0fd-7a4764f13086.png)

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
- [x] Truly random scrambling (cross-platform and/or customizable)

### License

MIT