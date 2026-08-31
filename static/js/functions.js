export function randomDec(min, max) {
  return Math.random() * (max - min) + min;
}
export function random(min, max) {
  return Math.round(randomDec(min, max));
}

export default { random, randomDec };
