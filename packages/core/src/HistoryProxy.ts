import type State from './State';
import { type RotationDirections, RotationType } from './types';
import simplifyHistory from './utils/simplifyHistory';

const { COUNTERCLOCKWISE } = RotationType;

class HistoryProxy {
  constructor(state: State) {
    const history: string[] = [];

    return new Proxy(this, {
      get: (target: this, name: keyof State | 'history', receiver: this) => {
        if (name === 'history') {
          return simplifyHistory(history);
        }

        if (name in target) {
          if (name.includes('rotate')) {
            let entry: string;
            const direction = name.replace('rotate', '') as RotationDirections;

            switch (direction) {
              case 'Back':
                entry = 'B';
                break;
              case 'Down':
                entry = 'D';
                break;
              case 'Front':
                entry = 'F';
                break;
              case 'Left':
                entry = 'L';
                break;
              case 'Right':
                entry = 'R';
                break;
              case 'Up':
                entry = 'U';
                break;
            }

            return function (type: RotationType) {
              if (type === COUNTERCLOCKWISE) {
                entry += "'";
              }

              history.push(entry);

              // @ts-expect-error `name.includes(...)` acts as a type guard
              return state[name].apply(state, [type]);
            };
          }

          return Reflect.get(target, name, receiver);
        } else {
          return state[name];
        }
      },
    });
  }

  get history() {
    return [];
  }
}

export default HistoryProxy;
