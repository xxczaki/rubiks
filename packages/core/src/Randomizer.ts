class Randomizer {
  #set: string[];

  constructor(set: string[]) {
    this.#set = set;
  }

  #getRandomNumber(max: number) {
    return Math.trunc(Math.random() * max);
  }

  randomize(
    amount: number,
    randomNumberGenerator: (max: number) => number = this.#getRandomNumber
  ) {
    const randomized: string[] = [];

    while (amount--) {
      randomized.push(this.#set[randomNumberGenerator(this.#set.length)]);
    }

    return randomized;
  }
}

export default Randomizer;
