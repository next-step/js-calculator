describe('계산기 테스트', () => {
  const clickDigit = (digit) => cy.get('.digit').contains(digit).click();
  const clickAC = () => cy.get('.modifier').contains('AC').click();
  const clickOperation = (operation) =>
    cy.get('.operation').contains(operation).click();
  const getTotal = () => cy.get('#total');

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('9 + 5 = 14', () => {
      clickDigit('9');
      clickOperation('+');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '14');
    });
    it('179 + 43 = 222', () => {
      clickDigit('1');
      clickDigit('7');
      clickDigit('9');
      clickOperation('+');
      clickDigit('4');
      clickDigit('3');
      clickOperation('=');
      getTotal().should('have.text', '222');
    });
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('9 - 5 = 4', () => {
      clickDigit('9');
      clickOperation('-');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '4');
    });
    it('179 - 987 = -808', () => {
      clickDigit('1');
      clickDigit('7');
      clickDigit('9');
      clickOperation('-');
      clickDigit('9');
      clickDigit('8');
      clickDigit('7');
      clickOperation('=');
      getTotal().should('have.text', '-808');
    });
    it('-9 - 5 = -14', () => {
      clickOperation('-');
      clickDigit('9');
      clickOperation('=');
      clickOperation('-');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '-14');
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('9 X 5 = 45', () => {
      clickDigit('9');
      clickOperation('X');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '45');
    });
    it('179 X 87 = 15573', () => {
      clickDigit('1');
      clickDigit('7');
      clickDigit('9');
      clickOperation('X');
      clickDigit('8');
      clickDigit('7');
      clickOperation('=');
      getTotal().should('have.text', '15573');
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('10 / 5 = 2', () => {
      clickDigit('1');
      clickDigit('0');
      clickOperation('/');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '2');
    });
    it('9 / 5 = 1', () => {
      clickDigit('9');
      clickOperation('/');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '1');
    });
    it('987 / 34 = 29', () => {
      clickDigit('9');
      clickDigit('8');
      clickDigit('7');
      clickOperation('/');
      clickDigit('3');
      clickDigit('4');
      clickOperation('=');
      getTotal().should('have.text', '29');
    });
  });

  describe('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    it('1을 누른 후 AC를 누르면 0이 된다.', () => {
      clickDigit('2');
      clickAC();
      getTotal().should('have.text', '0');
    });
    it('숫자와 연산을 누른 후 AC를 누르면 0이 된다.', () => {
      clickDigit('9');
      clickDigit('8');
      clickDigit('7');
      clickOperation('/');
      clickDigit('3');
      clickDigit('4');
      clickAC();
      getTotal().should('have.text', '0');
    });
    it('계산 중 AC로 초기화 한 이후에 이어서 9 X 5 = 45를 계산한다.', () => {
      clickDigit('9');
      clickOperation('/');
      clickDigit('3');
      clickAC();
      clickDigit('9');
      clickOperation('X');
      clickDigit('5');
      clickOperation('=');
      getTotal().should('have.text', '45');
    });
  });

  describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const ALERT_MSG = '숫자는 세자리까지만 입력 가능합니다!';

    it('첫 번째 숫자를 3자리 수 이상 입력하려 하면 alert가 뜬다.', () => {
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MSG);
      });
    });
    it('두 번째 숫자를 3자리 수 이상 입력하려 하면 alert가 뜬다.', () => {
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      clickOperation('+');
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_MSG);
      });
    });
  });

  describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    it('1 / 3 = 0', () => {
      clickDigit('1');
      clickOperation('/');
      clickDigit('3');
      clickOperation('=');
      getTotal().should('have.text', '0');
    });
    it('2 / 3 = 0', () => {
      clickDigit('2');
      clickOperation('/');
      clickDigit('3');
      clickOperation('=');
      getTotal().should('have.text', '0');
    });
    it('999 / 100 = 9', () => {
      clickDigit('9');
      clickDigit('9');
      clickDigit('9');
      clickOperation('/');
      clickDigit('1');
      clickDigit('0');
      clickDigit('0');
      clickOperation('=');
      getTotal().should('have.text', '9');
    });
    it('-10 / 3 = -3', () => {
      clickOperation('-');
      clickDigit('1');
      clickDigit('0');
      clickOperation('=');
      clickOperation('/');
      clickDigit('3');
      clickOperation('=');
      getTotal().should('have.text', '-3');
    });
  });
});
