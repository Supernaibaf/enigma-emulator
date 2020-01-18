import { Rotor } from './rotor';

export class Reflector {
  private rotor: Rotor;

  get type(): string {
    return this.typeDescription;
  }

  constructor(private typeDescription: string, alphabet: string[], mapping: string[]) {
    this.rotor = new Rotor(typeDescription, alphabet, mapping, alphabet[0]);
  }

  encrypt(letter: string): string {
    return this.rotor.encrypt(letter);
  }
}
