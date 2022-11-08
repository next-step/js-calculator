import { OPERATION } from '../../src/js/constants.js';

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('22 + 222 = 244', () => {
      cy.calculation([2, 2], OPERATION.PLUS, [2, 2, 2], 244);
    });
    it('0 + 2 = 2', () => {
      cy.calculation([0], OPERATION.PLUS, [2], 2);
    });
    it('400 + 0 = 400', () => {
      cy.calculation([4, 0, 0], OPERATION.PLUS, [0], 400);
    });
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('300 - 20 = 280', () => {
      cy.calculation([3, 0, 0], OPERATION.MINUS, [2, 0], 280);
    });
    it('10 - 20 = -10', () => {
      cy.calculation([1, 0], OPERATION.MINUS, [2, 0], -10);
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('11 * 100 = 1100', () => {
      cy.calculation([1, 1], OPERATION.MULTIPLY, [1, 0, 0], 1100);
    });
    it('2 * 0 = 0', () => {
      cy.calculation([2], OPERATION.MULTIPLY, [0], 0);
    });
    it('0 * 2 = 0', () => {
      cy.calculation([0], OPERATION.MULTIPLY, [2], 0);
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('2 / 0 = Infinity', () => {
      cy.calculation([2], OPERATION.DIVIDE, [0], Infinity);
    });
    it('555 / 2 = 277', () => {
      cy.calculation([5, 5, 5], OPERATION.DIVIDE, [2], 277);
    });
    it('30 / 2 = 15', () => {
      cy.calculation([3, 0], OPERATION.DIVIDE, [2], 15);
    });
  });

  describe('AC 버튼을 누르면 초기화가 가능하다.', () => {
    it('첫 번째 숫자를 입력하고 초기화', () => {
      cy.clickDigit([2, 0]);
      cy.modifierTest();
    });
    it('연산까지 입력하고 초기화', () => {
      cy.clickDigit([2, 5]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.modifierTest();
    });
    it('두 번째 숫자까지 입력하고 초기화', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([4]);
      cy.modifierTest();
    });
  });

  describe('계산 결과값이 나온 상태에서 사칙연산자를 클릭하고 숫자를 입력했을 때 계산이 가능하다.', () => {
    it('(2 + 40) * 2 = 84', () => {
      cy.calculation([2], OPERATION.PLUS, [4, 0], 42);
      cy.continueCalculation(OPERATION.MULTIPLY, [2], 84);
    });
    it('(2 - 4) / 2 = -1', () => {
      cy.calculation([2], OPERATION.MINUS, [4], -2);
      cy.continueCalculation(OPERATION.DIVIDE, [2], -1);
    });
  });

  describe('3자리 숫자를 넘어가면 alert창이 뜬다.', () => {
    it('첫 번째 숫자로 1111 입력했을 때 alert창이 뜬다.', () => {
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(111);
      cy.alertNotOverNumberLength();
    });
    it('444 + 1111 입력했을 때 alert창이 뜬다.', () => {
      cy.clickDigit([4, 4, 4]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(`444${OPERATION.PLUS}111`);
      cy.alertNotOverNumberLength();
    });
    it('(2 + 4) * 1000 입력했을 때 alert창이 뜬다.', () => {
      cy.calculation([2], OPERATION.PLUS, [4], 6);

      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([1, 0, 0, 0]);
      cy.getTotal(`6${OPERATION.MULTIPLY}100`);
      cy.alertNotOverNumberLength();
    });
  });

  describe('숫자를 입력하지 않은 상태에서 연산자를 클릭했을 때 alert창이 뜬다.', () => {
    it('숫자를 입력하지 않은 상태에서 + 버튼을 클릭했을 때 alert창이 뜬다.', () => {
      cy.alertNotFirstNumber(OPERATION.PLUS);
    });
    it('숫자를 입력하지 않은 상태에서 / 버튼을 클릭했을 때 alert창이 뜬다.', () => {
      cy.alertNotFirstNumber(OPERATION.PLUS);
    });
  });

  describe('숫자를 입력하고 사칙 연산자(+,-,x,/)를 클릭한 상태에서 = 버튼을 클릭했을 때 alert창이 뜬다.', () => {
    it('23 /=', () => {
      cy.alertNotSecondNumber([2, 3], OPERATION.DIVIDE);
    });
    it('400 +=', () => {
      cy.alertNotSecondNumber([4, 0, 0], OPERATION.PLUS);
    });
    it('5 *=', () => {
      cy.alertNotSecondNumber([5], OPERATION.MULTIPLY);
    });
  });
});
