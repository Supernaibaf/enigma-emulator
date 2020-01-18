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
    'I',
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('EKMFLGDQVZNTOWYHXUSPAIBRCJ'),
    'Q'
  );
}

function createRotorII(): Rotor {
  return new Rotor(
    'II',
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('AJDKSIRUXBLHWTMCQGZNPYFVOE'),
    'E'
  );
}

function createRotorIII(): Rotor {
  return new Rotor(
    'III',
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('BDFHJLCPRTXVZNYEIWGAKMUSQO'),
    'V'
  );
}

function createReflectorB(): Reflector {
  return new Reflector(
    'UKW-B',
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('YRUHQSLDPXNGOKMIEBFZCWVJAT	')
  );
}

function createReflectorC(): Reflector {
  return new Reflector(
    'UKW-C',
    stringToCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    stringToCharArray('FVPJIAOYEDRZXWGCTKUQSBNMHL')
  );
}

describe(RotorBox.name, () => {
  describe('encrypt', () => {
    it('should encrypt a letter correctly with one rotor', () => {
      const rotor0 = createRotorI();
      rotor0.setPosition('J');
      const rotorBox = new RotorBox([rotor0], createReflectorB());

      expect(rotorBox.encrypt('M')).toEqual('P');
    });

    it('should encrypt a letter correctly with three rotors', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      const rotor2 = createRotorIII();
      rotor0.setPosition('J');
      rotor1.setPosition('X');
      rotor2.setPosition('L');
      const rotorBox = new RotorBox([rotor0, rotor1, rotor2], createReflectorB());

      expect(rotorBox.encrypt('P')).toEqual('R');
    });
  });

  describe('step', () => {
    it('should move last rotor to next position', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      rotor0.setPosition('A');
      rotor1.setPosition('A');
      const rotorBox = new RotorBox([rotor0, rotor1], createReflectorB());

      rotorBox.step();

      expect(rotor1.positionLabel).toEqual('B');
    });

    it('should move next rotor if rotor passes turnover position', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      const rotor2 = createRotorIII();
      rotor0.setPosition('Q');
      rotor1.setPosition('E');
      rotor2.setPosition('V');
      const rotorBox = new RotorBox([rotor0, rotor1, rotor2], createReflectorB());

      rotorBox.step();

      expect(rotor0.positionLabel).toEqual('R');
      expect(rotor1.positionLabel).toEqual('F');
      expect(rotor2.positionLabel).toEqual('W');
    });
  });

  describe('setRotor', () => {
    it('should set the rotor correctly', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      rotor0.setPosition('A');
      rotor1.setPosition('A');
      const rotorBox = new RotorBox([rotor0, rotor1], createReflectorB());

      const newRotor = createRotorIII();
      rotorBox.setRotor(1, newRotor);

      expect(rotorBox.rotors[1]).toEqual(newRotor);
    });
  });

  describe('setReflector', () => {
    it('should set the reflector correctly', () => {
      const rotor0 = createRotorI();
      const rotor1 = createRotorII();
      rotor0.setPosition('A');
      rotor1.setPosition('A');
      const rotorBox = new RotorBox([rotor0, rotor1], createReflectorB());

      const newReflector = createReflectorC();
      rotorBox.setReflector(newReflector);

      expect(rotorBox.reflector).toEqual(newReflector);
    });
  });
});
