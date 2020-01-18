import { stringToCharArray } from './string-to-char-array';

describe(stringToCharArray.name, () => {
  it('should return array with characters of string', () => {
    expect(stringToCharArray('TEST')).toEqual(['T', 'E', 'S', 'T']);
  });
});
