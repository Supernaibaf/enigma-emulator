export function positiveModulo(num: number, modulus: number): number {
  return ((num % modulus) + modulus) % modulus;
}
