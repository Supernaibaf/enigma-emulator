import { Enigma } from './enigma';
import { Rotor } from './rotor-box/rotor';
import { stringToCharArray } from '../utility/string-to-char-array';
import { RotorBox } from './rotor-box/rotor-box';
import { Plugboard } from './plugboard/plugboard';
import { Reflector } from './rotor-box/reflector';

export type EnigmaConfiguration = {
  alphabet: string[];
  enigma: Enigma;
  rotors: Rotor[];
  reflectors: Reflector[];
  rotorBox: RotorBox;
  plugboard: Plugboard;
};

export function createEnigmaM3(): EnigmaConfiguration {
  const alphabet = stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const rotorI = new Rotor('I', alphabet, stringToCharArray('EKMFLGDQVZNTOWYHXUSPAIBRCJ'), 'Q');
  const rotorII = new Rotor('II', alphabet, stringToCharArray('AJDKSIRUXBLHWTMCQGZNPYFVOE'), 'E');
  const rotorIII = new Rotor('III', alphabet, stringToCharArray('BDFHJLCPRTXVZNYEIWGAKMUSQO'), 'V');
  const rotorIV = new Rotor('IV', alphabet, stringToCharArray('ESOVPZJAYQUIRHXLNFTGKDCMWB'), 'J');
  const rotorV = new Rotor('V', alphabet, stringToCharArray('VZBRGITYUPSDNHLXAWMJQOFECK'), 'Z');
  const reflectorB = new Reflector(
    'UKW-B',
    alphabet,
    stringToCharArray('YRUHQSLDPXNGOKMIEBFZCWVJAT')
  );
  const reflectorC = new Reflector(
    'UKW-C',
    alphabet,
    stringToCharArray('FVPJIAOYEDRZXWGCTKUQSBNMHL')
  );
  const rotorBox = new RotorBox([rotorI, rotorII, rotorIII], reflectorB);
  const plugboard = new Plugboard();
  const enigma = new Enigma(rotorBox, plugboard);

  return {
    alphabet,
    rotors: [rotorI, rotorII, rotorIII, rotorIV, rotorV],
    reflectors: [reflectorB, reflectorC],
    rotorBox,
    plugboard,
    enigma
  };
}
