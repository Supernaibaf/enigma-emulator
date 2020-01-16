import { positiveModulo } from './positive-modulo';

describe(positiveModulo.name, () => {
  it('should return correct modulo result', () => {
    expect(positiveModulo(72, 5)).toEqual(2);
  });

  it('should always return positive result', () => {
    expect(positiveModulo(-1, 27)).toEqual(26);
  });
});
