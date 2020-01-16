import { Rotor } from './rotor';

export class Reflector {
  private rotor: Rotor;

  constructor(alphabet: string[], mapping: string[]) {
    this.rotor = new Rotor(alphabet, mapping, alphabet[0]);
  }

  encrypt(letter: string): string {
    return this.rotor.encrypt(letter);
  }
}
