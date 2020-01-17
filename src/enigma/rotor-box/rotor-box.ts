import { Rotor } from './rotor';
import { Reflector } from './reflector';

export class RotorBox {
  private rotors: Rotor[];

  constructor(rotors: Rotor[], private reflector: Reflector) {
    this.rotors = Array.from(rotors);
  }

  encrypt(letter: string): any {
    let encryptedLetter = letter;
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      encryptedLetter = this.rotors[i].encrypt(encryptedLetter);
    }
    encryptedLetter = this.reflector.encrypt(encryptedLetter);
    for (let i = 0; i < this.rotors.length; i++) {
      encryptedLetter = this.rotors[i].encryptReverse(encryptedLetter);
    }
    return encryptedLetter;
  }

  step() {
    let rotorPosition = this.rotors.length - 1;
    let turnover = false;
    do {
      turnover = this.rotors[rotorPosition].step();
      rotorPosition--;
    } while (turnover && rotorPosition >= 0);
  }
}
