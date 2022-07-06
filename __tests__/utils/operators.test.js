import { op } from '../../src/js/util/operators';

describe('operators', () => {
  describe('add()', () => {
    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
      expect(op['+'](4, 5)).toBe(4 + 5);
    });
  });
  describe('subtract()', () => {
    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
      expect(op['-'](4, 5)).toBe(4 - 5);
    });
  });
  describe('multiply()', () => {
    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
      expect(op['X'](4, 5)).toBe(4 * 5);
    });
  });
  describe('divide()', () => {
    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
      expect(op['/'](4, 5)).toBe(4 / 5);
    });

    it('숫자를 0으로 나눌경우 Infinity가 된다.', () => {
      expect(op['/'](4, 0)).toBe(Infinity);
    });
  });
});
