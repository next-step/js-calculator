import { OPERATION, ALERT_MESSAGE } from '../../src/js/constants.js';

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  const calculation = (firstNumber, operation, secondNumber, expectedTotal) => {
    cy.clickDigit(firstNumber);
    cy.clickOperation(operation);
    cy.clickDigit(secondNumber);
    cy.clickOperation(OPERATION.EQUAL);
    cy.getTotal(expectedTotal);
  };

  describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('22 + 222 = 244', () => {
      calculation([2, 2], OPERATION.PLUS, [2, 2, 2], 244);
    });
    it('0 + 2 = 2', () => {
      calculation([0], OPERATION.PLUS, [2], 2);
    });
    it('400 + 0 = 400', () => {
      calculation([4, 0, 0], OPERATION.PLUS, [0], 400);
    });
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('300 - 20 = 280', () => {
      calculation([3, 0, 0], OPERATION.MINUS, [2, 0], 280);
    });
    it('10 - 20 = -10', () => {
      calculation([1, 0], OPERATION.MINUS, [2, 0], -10);
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('11 * 100 = 1100', () => {
      calculation([1, 1], OPERATION.MULTIPLY, [1, 0, 0], 1100);
    });
    it('2 * 0 = 0', () => {
      calculation([2], OPERATION.MULTIPLY, [0], 0);
    });
    it('0 * 2 = 0', () => {
      calculation([0], OPERATION.MULTIPLY, [2], 0);
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('2 / 0 = Infinity', () => {
      calculation([2], OPERATION.DIVIDE, [0], Infinity);
    });
    it('555 / 2 = 277', () => {
      calculation([5, 5, 5], OPERATION.DIVIDE, [2], 277);
    });
    it('30 / 2 = 15', () => {
      calculation([3, 0], OPERATION.DIVIDE, [2], 15);
    });
  });

  describe('AC 버튼을 누르면 초기화가 가능하다.', () => {
    const modifierTest = () => {
      cy.clickModifier();
      cy.getTotal(0);
    };
    it('첫 번째 숫자를 입력하고 초기화', () => {
      cy.clickDigit([2, 0]);
      modifierTest();
    });
    it('연산까지 입력하고 초기화', () => {
      cy.clickDigit([2, 5]);
      cy.clickOperation(OPERATION.DIVIDE);
      modifierTest();
    });
    it('두 번째 숫자까지 입력하고 초기화', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([4]);
      modifierTest();
    });
  });

  describe('계산 결과값이 나온 상태에서 사칙연산자를 클릭하고 숫자를 입력했을 때 계산이 가능하다.', () => {
    const continueCalculation = (operation, secondNumber, expectedTotal) => {
      cy.clickOperation(operation);
      cy.clickDigit(secondNumber);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(expectedTotal);
    };
    it('(2 + 40) * 2 = 84', () => {
      calculation([2], OPERATION.PLUS, [4, 0], 42);
      continueCalculation(OPERATION.MULTIPLY, [2], 84);
    });
    it('(2 - 4) / 2 = -1', () => {
      calculation([2], OPERATION.MINUS, [4], -2);
      continueCalculation(OPERATION.DIVIDE, [2], -1);
    });
  });

  describe('3자리 숫자를 넘어가면 alert창이 뜬다.', () => {
    const alertNotOverNumberLength = () => {
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
      });
    };
    it('첫 번째 숫자로 1111 입력했을 때 alert창이 뜬다.', () => {
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(111);
      alertNotOverNumberLength();
    });
    it('444 + 1111 입력했을 때 alert창이 뜬다.', () => {
      cy.clickDigit([4, 4, 4]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(`444${OPERATION.PLUS}111`);
      alertNotOverNumberLength();
    });
    it('(2 + 4) * 1000 입력했을 때 alert창이 뜬다.', () => {
      calculation([2], OPERATION.PLUS, [4], 6);

      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([1, 0, 0, 0]);
      cy.getTotal(`6${OPERATION.MULTIPLY}100`);
      alertNotOverNumberLength();
    });
  });

  describe('숫자를 입력하지 않은 상태에서 연산자를 클릭했을 때 alert창이 뜬다.', () => {
    const alertNotFirstNumber = (operation) => {
      cy.clickOperation(operation);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_FIRST_NUMBER);
      });
    };
    it('숫자를 입력하지 않은 상태에서 + 버튼을 클릭했을 때 alert창이 뜬다.', () => {
      alertNotFirstNumber(OPERATION.PLUS);
    });
    it('숫자를 입력하지 않은 상태에서 / 버튼을 클릭했을 때 alert창이 뜬다.', () => {
      alertNotFirstNumber(OPERATION.PLUS);
    });
  });

  describe('숫자를 입력하고 사칙 연산자(+,-,x,/)를 클릭한 상태에서 = 버튼을 클릭했을 때 alert창이 뜬다.', () => {
    const alertNotSecondNumber = (firstNumber, operation) => {
      cy.clickDigit(firstNumber);
      cy.clickModifier(operation);
      cy.clickModifier(OPERATION.EQUAL);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_SECOND_NUMBER);
      });
    };
    it('23 /=', () => {
      alertNotSecondNumber([2, 3], OPERATION.DIVIDE);
    });
    it('400 +=', () => {
      alertNotSecondNumber([4, 0, 0], OPERATION.PLUS);
    });
    it('5 *=', () => {
      alertNotSecondNumber([5], OPERATION.MULTIPLY);
    });
  });
});
