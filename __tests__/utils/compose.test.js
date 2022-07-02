import { limitNumberSize } from '../../src/js/util/validate';

describe('modules', () => {
  describe('limitNumberSize', () => {
    it('제한된 사이즈가 초과하지 않는경우 새로운 숫자를 리턴한다.', () => {
      const oldNumber = '12';
      const newNumber = '3';
      const callback = jest.fn(() => {});
      const result = limitNumberSize(oldNumber, newNumber, 3, callback);
      expect(result).toBe(`${oldNumber}${newNumber}`);
    });
    it('제한된 사이즈를 초과한경우 oldNumber를 리턴한다.', () => {
      const oldNumber = '123';
      const newNumber = '4';
      const callback = jest.fn(() => {});
      const result = limitNumberSize(oldNumber, newNumber, 3, callback);
      expect(result).toBe(oldNumber);
      expect(callback).toBeCalled();
    });
  });
});
