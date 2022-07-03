import { DEFAULT_VALUE, calculatorModule } from '../../src/js/util/calculator';

describe('calculatorModule', () => {
  const mockTotalEl = { innerHTML: '' };
  const {
    compute,
    arrayToMergedString,
    initialData,
    onNumberClickEvent,
    onOperatorClickEvent,
  } = calculatorModule(mockTotalEl);

  describe('compute()', () => {
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

  describe('arrayToMergedString()', () => {
    it('배열을 하나의 병합된 문자열을 리턴한다.', () => {
      const mockArray = ['1', '+', '3'];
      expect(arrayToMergedString(mockArray)).toBe('1+3');
    });
    it('배열에 값이 없으면 빈문바열을 리턴한다.', () => {
      const mockArray = [];
      expect(arrayToMergedString(mockArray)).toBe('');
    });
  });

  const mockClickNumber0EventObj = { target: { innerHTML: '0' } };
  const mockClickNumber4EventObj = { target: { innerHTML: '4' } };
  const mockClickAddOperatorEventObj = { target: { innerHTML: '+' } };
  const mockClickSubtractOperatorEventObj = { target: { innerHTML: '-' } };
  const mockClickMultiplyOperatorEventObj = { target: { innerHTML: 'X' } };
  const mockClickDivideOperatorEventObj = { target: { innerHTML: '/' } };
  const mockClickNumber2EventObj = { target: { innerHTML: '2' } };
  const mockClickComputeOperatorEventObj = { target: { innerHTML: '=' } };

  describe('initialData()', () => {
    it(`AC(All Clear)버튼을 누르면 ${DEFAULT_VALUE}으로 초기화 한다.`, () => {
      onNumberClickEvent(mockClickNumber4EventObj);
      expect(mockTotalEl).toBeTruthy();
      initialData();
      expect(mockTotalEl.innerHTML).toBe('0');
    });
  });

  beforeEach(() => {
    initialData();
  });
  describe('onNumberClickEvent()', () => {
    describe('첫번쨰 피연산자 입력', () => {
      it('0입력 시 그대로 0이 출력된다.', () => {
        expect(mockTotalEl.innerHTML).toBe('0');
        onNumberClickEvent(mockClickNumber0EventObj);
        expect(mockTotalEl.innerHTML).toBe('0');
      });
      it('0이아닌 숫자가 입력된 상태에서 추가로 입력하면 입력된 순서대로 출력된다.', () => {
        onNumberClickEvent(mockClickNumber4EventObj);
        expect(mockTotalEl.innerHTML).toBe('4');
        onNumberClickEvent(mockClickNumber4EventObj);
        expect(mockTotalEl.innerHTML).toBe('44');
      });
    });

    describe('두번쨰 피연산자 입력', () => {
      it('0입력 후 0이외에 숫자를 입력한경우 0자리에 덮어씌어진다.', () => {
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickDivideOperatorEventObj);
        onNumberClickEvent(mockClickNumber0EventObj);
        expect(mockTotalEl.innerHTML).toBe('4/0');
        onNumberClickEvent(mockClickNumber4EventObj);
        expect(mockTotalEl.innerHTML).toBe('4/4');
      });

      it('0입력 시 그대로 0이 출력된다.', () => {
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickDivideOperatorEventObj);
        onNumberClickEvent(mockClickNumber0EventObj);
        expect(mockTotalEl.innerHTML).toBe('4/0');
        onNumberClickEvent(mockClickNumber0EventObj);
        expect(mockTotalEl.innerHTML).toBe('4/0');
      });
    });
  });

  describe('onOperatorClickEvent()', () => {
    describe('= 연산자', () => {
      it('두 값을 더할 수 있다.', () => {
        initialData();
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickAddOperatorEventObj);
        onNumberClickEvent(mockClickNumber2EventObj);
        onOperatorClickEvent(mockClickComputeOperatorEventObj);
        expect(mockTotalEl.innerHTML).toBe('6');
      });
      it('두 값을 뺄 수 있다.', () => {
        initialData();
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickSubtractOperatorEventObj);
        onNumberClickEvent(mockClickNumber2EventObj);
        onOperatorClickEvent(mockClickComputeOperatorEventObj);
        expect(mockTotalEl.innerHTML).toBe('2');
      });
      it('두 값을 곱할 수 있다.', () => {
        initialData();
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickMultiplyOperatorEventObj);
        onNumberClickEvent(mockClickNumber2EventObj);
        onOperatorClickEvent(mockClickComputeOperatorEventObj);
        expect(mockTotalEl.innerHTML).toBe('8');
      });
      it('두 값을 나눌 수 있다.', () => {
        initialData();
        onNumberClickEvent(mockClickNumber4EventObj);
        onOperatorClickEvent(mockClickDivideOperatorEventObj);
        onNumberClickEvent(mockClickNumber2EventObj);
        onOperatorClickEvent(mockClickComputeOperatorEventObj);
        expect(mockTotalEl.innerHTML).toBe('2');
      });
    });
  });
});
