export default function secureRandomNumberGenerator(max: number) {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  return Math.floor(randomNumber * max);
}
