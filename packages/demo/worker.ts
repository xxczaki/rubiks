import Cube from '@rubiks/core';

import drawCube from './utils/drawCube';

type ExecuteTuple = [methodName: keyof Cube, methodArguments?: unknown[]];
type Payload = HTMLCanvasElement | ExecuteTuple;

const cube = new Cube();
let canvas: HTMLCanvasElement;

addEventListener('message', (event: MessageEvent<Payload>) => {
  const payload = event.data;

  // `payload instanceof HTMLCanvasElement` doesn't work here
  if (!('length' in payload)) {
    canvas = payload;
  }

  try {
    const [methodName, methodArguments] = payload as ExecuteTuple;

    if (typeof methodArguments === 'undefined') {
      // @ts-expect-error Temporary solution
      cube[methodName]();
    } else {
      // @ts-expect-error Temporary solution
      cube[methodName](...methodArguments);
    }
  } catch {}

  drawCube(canvas, cube);
  postMessage({ history: cube.history, emoji: cube.emoji });
});
