import { Enigma } from './enigma';
import { Rotor } from './rotor-box/rotor';
import { stringToCharArray } from '../utility/string-to-char-array';
import { RotorBox } from './rotor-box/rotor-box';
import { Plugboard } from './plugboard/plugboard';
import { Reflector } from './rotor-box/reflector';

type EnigmaConfiguration = {
  enigma: Enigma;
  rotors: Rotor[];
  reflectors: Reflector[];
  rotorBox: RotorBox;
  plugboard: Plugboard;
};

export function createEnigmaM3(): EnigmaConfiguration {
  const rotorI = new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('EKMFLGDQVZNTOWYHXUSPAIBRCJ'),
    'Q'
  );
  const rotorII = new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('AJDKSIRUXBLHWTMCQGZNPYFVOE'),
    'E'
  );
  const rotorIII = new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('BDFHJLCPRTXVZNYEIWGAKMUSQO'),
    'V'
  );
  const rotorIV = new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('ESOVPZJAYQUIRHXLNFTGKDCMWB'),
    'J'
  );
  const rotorV = new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('VZBRGITYUPSDNHLXAWMJQOFECK'),
    'Z'
  );
  const reflectorB = new Reflector(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('YRUHQSLDPXNGOKMIEBFZCWVJAT')
  );
  const reflectorC = new Reflector(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('FVPJIAOYEDRZXWGCTKUQSBNMHL')
  );
  const rotorBox = new RotorBox([rotorI, rotorII, rotorIII], reflectorB);
  const plugboard = new Plugboard();
  const enigma = new Enigma(rotorBox, plugboard);

  return {
    rotors: [rotorI, rotorII, rotorIII, rotorIV, rotorV],
    reflectors: [reflectorB, reflectorC],
    rotorBox,
    plugboard,
    enigma
  };
}
