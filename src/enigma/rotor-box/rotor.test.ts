import { Rotor } from './rotor';

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

describe(Rotor.name, () => {
  describe('encrypt', () => {
    it('should return letter according to mapping', () => {
      const rotor = createRotorI();

      expect(rotor.encrypt('B')).toEqual('K');
    });

    it('should return letter according to mapping and position', () => {
      const rotor = createRotorI();
      rotor.setPosition('V');

      expect(rotor.encrypt('B')).toEqual('B');
    });
  });

  describe('encryptReverse', () => {
    it('should return letter according to mapping', () => {
      const rotor = createRotorI();

      expect(rotor.encryptReverse('K')).toEqual('B');
    });

    it('should return letter according to mapping and position', () => {
      const rotor = createRotorI();
      rotor.setPosition('V');

      expect(rotor.encryptReverse('B')).toEqual('B');
    });

    it('should return correct letter if position is bigger than index of letter in reverse mapping', () => {
      const rotor = createRotorI();
      rotor.setPosition('J');

      expect(rotor.encryptReverse('V')).toEqual('Z');
    });
  });

  describe('setPosition', () => {
    it('should set rotor position correctly', () => {
      const rotor = createRotorI();

      rotor.setPosition('C');

      expect(rotor.positionLabel).toEqual('C');
    });
  });

  describe('step', () => {
    it('should move position one step further', () => {
      const rotor = createRotorI();
      rotor.setPosition('O');

      rotor.step();

      expect(rotor.positionLabel).toEqual('P');
    });

    it('should set position to first letter when alphabet ends', () => {
      const rotor = createRotorI();
      rotor.setPosition('Z');

      rotor.step();

      expect(rotor.positionLabel).toEqual('A');
    });

    it('should return true on turnover', () => {
      const rotor = createRotorI();
      rotor.setPosition('Q');

      expect(rotor.step()).toBeTruthy();
    });

    it('should return false when no turnover happened', () => {
      const rotor = createRotorI();
      rotor.setPosition('N');

      expect(rotor.step()).toBeFalsy();
    });
  });
});
