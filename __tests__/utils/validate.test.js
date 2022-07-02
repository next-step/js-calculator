import {
  LIMITED_PLACE_VALUE,
  checkLimitNumber,
} from '../../src/js/util/validate';

describe('validate', () => {
  describe('checkLimitNumber()', () => {
    it('제한된 사이즈가 초과하지 않는경우 새로운 숫자를 리턴한다.', () => {
      const oldNumber = '12';
      const newNumber = '3';
      const callback = jest.fn(() => {});
      const result = checkLimitNumber(
        oldNumber,
        newNumber,
        LIMITED_PLACE_VALUE,
        callback
      );
      expect(result).toBe(`${oldNumber}${newNumber}`);
    });
    it('제한된 사이즈를 초과한경우 oldNumber를 리턴한다.', () => {
      const oldNumber = '123';
      const newNumber = '4';
      const callback = jest.fn(() => {});
      const result = checkLimitNumber(
        oldNumber,
        newNumber,
        LIMITED_PLACE_VALUE,
        callback
      );
      expect(result).toBe(oldNumber);
      expect(callback).toBeCalled();
    });
  });
});
