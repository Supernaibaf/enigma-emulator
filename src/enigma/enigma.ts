import { RotorBox } from './rotor-box/rotor-box';
import { Plugboard } from './plugboard/plugboard';

export class Enigma {
  constructor(private rotorBox: RotorBox, private plugboard: Plugboard) {}

  encrypt(letter: string) {
    this.rotorBox.step();
    let encryptedLetter = this.plugboard.encrypt(letter);
    encryptedLetter = this.rotorBox.encrypt(encryptedLetter);
    return this.plugboard.encrypt(encryptedLetter);
  }

  encryptText(test: string): any {
    let output = '';
    for (let i = 0; i < test.length; i++) {
      output += this.encrypt(test[i]);
    }
    return output;
  }
}
