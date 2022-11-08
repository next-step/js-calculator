import { OPERATION, ALERT_MESSAGE } from '../../src/js/constants.js';

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('22 + 222 = 244', () => {
      cy.clickDigit([2, 2]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([2, 2, 2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(244);
    });
    it('0 + 2 = 2', () => {
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(2);
    });
    it('400 + 0 = 400', () => {
      cy.clickDigit([4, 0, 0]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(400);
    });
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('300 - 20 = 280', () => {
      cy.clickDigit([3, 0, 0]);
      cy.clickOperation(OPERATION.MINUS);
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(280);
    });
    it('10 - 20 = -10', () => {
      cy.clickDigit([1, 0]);
      cy.clickOperation(OPERATION.MINUS);
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(-10);
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('11 * 100 = 1100', () => {
      cy.clickDigit([1, 1]);
      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([1, 0, 0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.getTotal(1100);
    });
    it('2 * 0 = 0', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.getTotal(0);
    });
    it('0 * 2 = 0', () => {
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);

      cy.getTotal(0);
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('2 / 0 = Infinity', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([0]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(Infinity);
    });
    it('555 / 2 = 277', () => {
      cy.clickDigit([5, 5, 5]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(277);
    });
    it('30 / 2 = 15', () => {
      cy.clickDigit([3, 0]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(15);
    });
  });

  describe('AC 버튼을 누르면 초기화가 가능하다.', () => {
    it('첫 번째 숫자를 입력하고 초기화', () => {
      cy.clickDigit([2, 0]);
      cy.clickModifier();
      cy.getTotal(0);
    });
    it('연산까지 입력하고 초기화', () => {
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickModifier();
      cy.getTotal(0);
    });
    it('두 번째 숫자까지 입력하고 초기화', () => {
      cy.clickDigit([2, 0]);
      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2, 0]);
      cy.clickModifier();
      cy.getTotal(0);
    });
  });

  describe('이전 계산 결과값을 이용해 게속 계산할 수 있다.', () => {
    it('(2 + 40) * 2 = 84', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([4, 0]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(42);

      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(84);
    });
    it('(2 - 4) / 2 = -1', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.MINUS);
      cy.clickDigit([4]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(-2);

      cy.clickOperation(OPERATION.DIVIDE);
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(-1);
    });
  });

  describe('3자리 숫자를 넘어가면 alert창이 뜬다.', () => {
    it('첫 번째 숫자로 1111 입력하면 alert창이 뜬다.', () => {
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(111);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
      });
    });
    it('444 + 1111 입력한다.', () => {
      cy.clickDigit([4, 4, 4]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([1, 1, 1, 1]);
      cy.getTotal(`444${OPERATION.PLUS}111`);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
      });
    });
    it('(2 + 4) * 1000 입력한다.', () => {
      cy.clickDigit([2]);
      cy.clickOperation(OPERATION.PLUS);
      cy.clickDigit([4]);
      cy.clickOperation(OPERATION.EQUAL);
      cy.getTotal(6);

      cy.clickOperation(OPERATION.MULTIPLY);
      cy.clickDigit([1, 0, 0, 0]);
      cy.getTotal(`6${OPERATION.MULTIPLY}100`);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
      });
    });
  });

  describe('맨 처음 연산자부터 클릭하면 alert창이 뜬다.', () => {
    it('맨 처음 + 버튼을 클릭한다.', () => {
      cy.clickOperation(OPERATION.PLUS);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_FIRST_NUMBER);
      });
    });
    it('맨 처음 / 버튼을 클릭한다.', () => {
      cy.clickOperation(OPERATION.DIVIDE);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_FIRST_NUMBER);
      });
    });
  });

  describe('사칙 연산자(+,-,x,/)를 한 번 누르고 = 버튼을 클릭하면 alert창이 뜬다.', () => {
    it('23 /=', () => {
      cy.clickDigit([2, 3]);
      cy.clickModifier(OPERATION.DIVIDE);
      cy.clickModifier(OPERATION.EQUAL);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_SECOND_NUMBER);
      });
    });
    it('400 +=', () => {
      cy.clickDigit([4, 0, 0]);
      cy.clickModifier(OPERATION.PLUS);
      cy.clickModifier(OPERATION.EQUAL);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_SECOND_NUMBER);
      });
    });
    it('5 *=', () => {
      cy.clickDigit([5]);
      cy.clickModifier(OPERATION.MULTIPLY);
      cy.clickModifier(OPERATION.EQUAL);
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MESSAGE.NOT_SECOND_NUMBER);
      });
    });
  });
});
