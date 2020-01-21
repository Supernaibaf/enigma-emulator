import { Plugboard } from './plugboard';

describe(Plugboard.name, () => {
  describe('encrypt', () => {
    it('should not encrypt a letter if no connection is plugged', () => {
      const plugboard = new Plugboard();

      expect(plugboard.encrypt('V')).toEqual('V');
    });

    it('should not encrypt a letter if no connection connects this letter', () => {
      const plugboard = new Plugboard();

      plugboard.addConnection('A', 'B');

      expect(plugboard.encrypt('X')).toEqual('X');
    });

    it('should encrypt a letter if a connection connects this letter', () => {
      const plugboard = new Plugboard();

      plugboard.addConnection('C', 'F');

      expect(plugboard.encrypt('F')).toEqual('C');
      expect(plugboard.encrypt('C')).toEqual('F');
    });

    it('should not encrypt a letter if a connection that connects this letter was removed', () => {
      const plugboard = new Plugboard();

      plugboard.addConnection('U', 'N');
      plugboard.removeConnection('N');

      expect(plugboard.encrypt('U')).toEqual('U');
      expect(plugboard.encrypt('N')).toEqual('N');
    });
  });

  describe('get plugs', () => {
    it('should return a plug per connection', () => {
      const plugboard = new Plugboard();

      plugboard.addConnection('Z', 'X');
      plugboard.addConnection('B', 'L');

      expect(plugboard.plugs).toEqual([
        { origin: 'Z', target: 'X' },
        { origin: 'B', target: 'L' }
      ]);
    });
  });
});
