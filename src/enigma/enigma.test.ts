import { Enigma } from './enigma';
import { createEnigmaM3 } from './enigma-configurations';

describe(Enigma.name, () => {
  describe('encrypt', () => {
    it('should encrypt a letter using the rotor-box and plugboard after performing a step', () => {
      const config = createEnigmaM3();
      config.rotors[0].setPosition('M');
      config.rotors[1].setPosition('F');
      config.rotors[2].setPosition('R');
      config.rotors[0].setRingSetting('I');
      config.rotors[1].setRingSetting('R');
      config.rotors[2].setRingSetting('Z');
      config.plugboard.addConnection('T', 'Z');
      config.plugboard.addConnection('N', 'J');
      config.plugboard.addConnection('U', 'D');
      config.plugboard.addConnection('F', 'W');
      config.plugboard.addConnection('M', 'P');
      config.plugboard.addConnection('E', 'L');

      expect(config.enigma.encrypt('Q')).toEqual('J');
    });

    it('should encrypt text correctly', () => {
      const config = createEnigmaM3();
      config.rotors[0].setPosition('P');
      config.rotors[1].setPosition('U');
      config.rotors[2].setPosition('S');
      config.rotors[0].setRingSetting('B');
      config.rotors[1].setRingSetting('A');
      config.rotors[2].setRingSetting('A');
      config.plugboard.addConnection('T', 'P');
      config.plugboard.addConnection('L', 'X');
      config.plugboard.addConnection('A', 'C');
      config.plugboard.addConnection('O', 'S');
      config.plugboard.addConnection('B', 'V');
      config.plugboard.addConnection('D', 'Z');

      expect(config.enigma.encryptText('TEST')).toEqual('CQXL');
    });

    it('should encrypt text correctly', () => {
      const config = createEnigmaM3();
      config.rotors[0].setPosition('P');
      config.rotors[1].setPosition('U');
      config.rotors[2].setPosition('S');
      config.rotors[0].setRingSetting('B');
      config.rotors[1].setRingSetting('A');
      config.rotors[2].setRingSetting('A');
      config.plugboard.addConnection('T', 'P');
      config.plugboard.addConnection('L', 'X');
      config.plugboard.addConnection('A', 'C');
      config.plugboard.addConnection('O', 'S');
      config.plugboard.addConnection('B', 'V');
      config.plugboard.addConnection('D', 'Z');

      expect(config.enigma.encryptText('CQXL')).toEqual('TEST');
    });
  });
});
