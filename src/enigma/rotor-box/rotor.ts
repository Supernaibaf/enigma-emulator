import { positiveModulo } from '../../utility/positive-modulo';

export class Rotor {
  private alphabetSize: number;

  private alphabet: Map<string, number>;

  private alphabetReverse: Map<number, string>;

  private mapping: Map<number, string>;

  private mappingReverse: Map<string, number>;

  private turnover: number;

  private position: number;

  get positionLabel(): string {
    return this.alphabetReverse.get(this.position)!;
  }

  constructor(alphabet: string[], mapping: string[], turnover: string) {
    this.alphabetSize = alphabet.length;
    this.position = 0;
    this.turnover = alphabet.indexOf(turnover);

    this.alphabet = new Map<string, number>();
    this.alphabetReverse = new Map<number, string>();
    this.mapping = new Map<number, string>();
    this.mappingReverse = new Map<string, number>();
    for (let i = 0; i < alphabet.length; i++) {
      this.alphabet.set(alphabet[i], i);
      this.alphabetReverse.set(i, alphabet[i]);
      this.mapping.set(i, mapping[i]);
      this.mappingReverse.set(mapping[i], i);
    }
  }

  encrypt(letter: string): string {
    const index = positiveModulo(this.alphabet.get(letter)! + this.position, this.alphabetSize);
    const encryptedLetter = this.mapping.get(index)!;
    return encryptedLetter;
  }

  encryptReverse(letter: string): string {
    const index = positiveModulo(
      this.mappingReverse.get(letter)! - this.position,
      this.alphabetSize
    );
    const encryptedLetter = this.alphabetReverse.get(index)!;
    return encryptedLetter;
  }

  setPosition(letter: string) {
    this.position = this.alphabet.get(letter)!;
  }

  step(): boolean {
    const turnover = this.position === this.turnover;
    this.position = (this.position + 1) % this.alphabetSize;
    return turnover;
  }
}
