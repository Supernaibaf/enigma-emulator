import { positiveModulo } from '../../utility/positive-modulo';

export class Rotor {
  private alphabetSize: number;

  private alphabet: Map<string, number>;

  private alphabetReverse: Map<number, string>;

  private mapping: Map<number, number>;

  private mappingReverse: Map<number, number>;

  private turnover: number;

  private position: number;

  private ringSetting: number;

  get positionLabel(): string {
    return this.alphabetReverse.get(this.position)!;
  }

  constructor(alphabet: string[], mapping: string[], turnover: string) {
    this.alphabetSize = alphabet.length;
    this.position = 0;
    this.ringSetting = 0;
    this.turnover = alphabet.indexOf(turnover);

    this.alphabet = new Map<string, number>();
    this.alphabetReverse = new Map<number, string>();
    for (let i = 0; i < alphabet.length; i++) {
      this.alphabet.set(alphabet[i], i);
      this.alphabetReverse.set(i, alphabet[i]);
    }
    this.mapping = new Map<number, number>();
    this.mappingReverse = new Map<number, number>();
    for (let i = 0; i < mapping.length; i++) {
      this.mapping.set(i, this.alphabet.get(mapping[i])!);
      this.mappingReverse.set(this.alphabet.get(mapping[i])!, i);
    }
  }

  encrypt(letter: string): string {
    const index = positiveModulo(
      this.alphabet.get(letter)! + this.position - this.ringSetting,
      this.alphabetSize
    );
    const encryptedIndex = positiveModulo(
      this.mapping.get(index)! - this.position + this.ringSetting,
      this.alphabetSize
    );
    return this.alphabetReverse.get(encryptedIndex)!;
  }

  encryptReverse(letter: string): string {
    const index = positiveModulo(
      this.alphabet.get(letter)! + this.position - this.ringSetting,
      this.alphabetSize
    );
    const encryptedIndex = positiveModulo(
      this.mappingReverse.get(index)! - this.position + this.ringSetting,
      this.alphabetSize
    );
    return this.alphabetReverse.get(encryptedIndex)!;
  }

  setPosition(letter: string) {
    this.position = this.alphabet.get(letter)!;
  }

  setRingSetting(letter: string) {
    this.ringSetting = this.alphabet.get(letter)!;
  }

  step(): boolean {
    const turnover = this.position === this.turnover;
    this.position = (this.position + 1) % this.alphabetSize;
    return turnover;
  }
}
