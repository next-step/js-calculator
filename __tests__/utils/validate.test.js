import {
  LIMITED_PLACE_VALUE,
  isLimitNumber,
  isFalsyEnteredNumber,
  isEnterFromZeroToZero,
} from '../../src/js/util/validate';

describe('validate', () => {
  describe('isLimitNumber()', () => {
    it('제한된 사이즈가 초과하지 않는경우 true 리턴한다.', () => {
      const enteredNumber = '12';
      const result = isLimitNumber(enteredNumber, LIMITED_PLACE_VALUE);
      expect(result).toBe(false);
    });
    it('제한된 사이즈를 초과한경우 false를 리턴한다.', () => {
      const enteredNumber = '123';
      const result = isLimitNumber(enteredNumber, LIMITED_PLACE_VALUE);
      expect(result).toBe(true);
    });
  });

  describe('isFalsyEnteredNumber()', () => {
    it('Falsy한 값인 경우 true를 리턴한다.', () => {
      expect(isFalsyEnteredNumber(undefined)).toBe(true);
      expect(isFalsyEnteredNumber(null)).toBe(true);
    });
    it('0인경우 true를 리턴한다.', () => {
      expect(isFalsyEnteredNumber('0')).toBe(true);
    });
  });

  describe('isEnterFromZeroToZero()', () => {
    it('입력된 값이 0이고 0을 입력하는 경우 true를 리턴한다.', () => {
      expect(isEnterFromZeroToZero('0', '0')).toBe(true);
    });
  });
});
