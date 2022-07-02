import { compute } from '../../src/js/util/calculator';

describe('calculate', () => {
  describe('compute', () => {
    let mockOperatorFn;
    beforeEach(() => {
      mockOperatorFn = jest.fn((a, b) => +a + +b);
    });
    it('compute(피연산자)(연산자)(피연산자)를 정상적으로 수행한다.', () => {
      const preOperand = '1';
      const postOperand = '2';
      const result = compute('1')(mockOperatorFn)('2');

      expect(result).toBe(mockOperatorFn(preOperand, postOperand));
      expect(mockOperatorFn).toBeCalled();
    });

    it('연산자와 두번째 피연산자중 하나라도 Falsy한 값인 경우 첫번째 피연산자를 리턴한다.', () => {
      const preOperand = '1';

      expect(compute('1')(mockOperatorFn)(undefined)).toBe(+preOperand);
      expect(mockOperatorFn).toBeCalledTimes(0);

      expect(compute('1')(undefined)(undefined)).toBe(+preOperand);
    });
  });

  describe('arrayToPlainText', () => {});
});
