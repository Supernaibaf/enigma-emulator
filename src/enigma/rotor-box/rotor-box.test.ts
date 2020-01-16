import { RotorBox } from './rotor-box';
import { Rotor } from './rotor';
import { Reflector } from './reflector';

function stringToCharArray(str: string): string[] {
  const chars = [];
  for (let i = 0; i < str.length; i++) {
    chars.push(str.charAt(i));
  }
  return chars;
}

function createRotorI(): Rotor {
  return new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('EKMFLGDQVZNTOWYHXUSPAIBRCJ'),
    'Q'
  );
}

function createRotorII(): Rotor {
  return new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('AJDKSIRUXBLHWTMCQGZNPYFVOE'),
    'E'
  );
}

function createRotorIII(): Rotor {
  return new Rotor(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('BDFHJLCPRTXVZNYEIWGAKMUSQO'),
    'V'
  );
}

function createReflectorA(): Reflector {
  return new Reflector(
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('EJMZALYXVBWFCRQUONTSPIKHGD')
  );
}

describe(RotorBox.name, () => {
  describe('encrypt', () => {
    it('should encrypt a letter correctly with one rotor', () => {
      const rotor0 = createRotorI();
      rotor0.setPosition('J');
      const rotorBox = new RotorBox([rotor0], createReflectorA());

      expect(rotorBox.encrypt('M')).toEqual('Z');
    });

    it('should encrypt a letter correctly with three rotors', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      const rotor2 = createRotorIII();
      rotor0.setPosition('J');
      rotor1.setPosition('X');
      rotor2.setPosition('L');
      const rotorBox = new RotorBox([rotor0, rotor1, rotor2], createReflectorA());

      expect(rotorBox.encrypt('P')).toEqual('K');
    });
  });
});
