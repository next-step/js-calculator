describe('계산기 테스트', () => {
  const clickDigitElement = (digit) => cy.get('.digit').contains(digit).click();
  const clickResetButton = () => cy.get('.modifier').contains('AC').click();
  const clickOperationElement = (operation) =>
    cy.get('.operation').contains(operation).click();
  const getResult = () => cy.get('#total');

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('1 + 2 = 3', () => {
      clickDigitElement('1');
      clickOperationElement('+');
      clickDigitElement('2');
      clickOperationElement('=');
      getResult().should('have.text', '3');
    });
    it('100 + 20 = 120', () => {
      clickDigitElement('1');
      clickDigitElement('0');
      clickDigitElement('0');
      clickOperationElement('+');
      clickDigitElement('2');
      clickDigitElement('0');
      clickOperationElement('=');
      getResult().should('have.text', '120');
    });
  });

  describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('5 - 4 = 1', () => {
      clickDigitElement('5');
      clickOperationElement('-');
      clickDigitElement('4');
      clickOperationElement('=');
      getResult().should('have.text', '1');
    });
    it('123 - 23 = 100', () => {
      clickDigitElement('1');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('-');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('=');
      getResult().should('have.text', '100');
    });
  });

  describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('2 X 5 = 10', () => {
      clickDigitElement('2');
      clickOperationElement('X');
      clickDigitElement('5');
      clickOperationElement('=');
      getResult().should('have.text', '10');
    });
    it('123 X 23 = 2829', () => {
      clickDigitElement('1');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('X');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('=');
      getResult().should('have.text', '2829');
    });
  });

  describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('100 / 2 = 50', () => {
      clickDigitElement('1');
      clickDigitElement('0');
      clickDigitElement('0');
      clickOperationElement('/');
      clickDigitElement('2');
      clickOperationElement('=');
      getResult().should('have.text', '50');
    });
    it('8 / 3 = 2', () => {
      clickDigitElement('8');
      clickOperationElement('/');
      clickDigitElement('3');
      clickOperationElement('=');
      getResult().should('have.text', '2');
    });
    it('123 / 23 = 5', () => {
      clickDigitElement('1');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('/');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('=');
      getResult().should('have.text', '5');
    });
  });

  describe('AC 버튼 클릭 시 계산기가 초기화 된다.', () => {
    it('디스플레이에 1을 입력 후 AC를 클릭하면 0이 된다.', () => {
      clickDigitElement('2');
      clickResetButton();
      getResult().should('have.text', '0');
    });
    it('숫자와 연산자를 입력 후 AC를 클릭하면 0이 된다.', () => {
      clickDigitElement('1');
      clickDigitElement('2');
      clickDigitElement('3');
      clickOperationElement('/');
      clickDigitElement('1');
      clickDigitElement('0');
      clickResetButton();
      getResult().should('have.text', '0');
    });
  });

  describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const alertMessage = '숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.';

    it('첫 번째 숫자를 3자리 수 이상 입력하려 하면 alert이 뜬다.', () => {
      clickDigitElement('1');
      clickDigitElement('1');
      clickDigitElement('1');
      clickDigitElement('1');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(alertMessage);
      });
    });
    it('두 번째 숫자를 3자리 수 이상 입력하려 하면 alert이 뜬다.', () => {
      clickDigitElement('1');
      clickDigitElement('1');
      clickDigitElement('1');
      clickOperationElement('+');
      clickDigitElement('1');
      clickDigitElement('1');
      clickDigitElement('1');
      clickDigitElement('1');
      cy.on('window:alert', (text) => {
        expect(text).to.contains(alertMessage);
      });
    });
  });

  describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    it('1 / 5 = 0', () => {
      clickDigitElement('1');
      clickOperationElement('/');
      clickDigitElement('5');
      clickOperationElement('=');
      getResult().should('have.text', '0');
    });
    it('2 / 3 = 0', () => {
      clickDigitElement('2');
      clickOperationElement('/');
      clickDigitElement('3');
      clickOperationElement('=');
      getResult().should('have.text', '0');
    });
    it('123 / 2 = 61', () => {
      clickDigitElement('9');
      clickDigitElement('9');
      clickDigitElement('9');
      clickOperationElement('/');
      clickDigitElement('1');
      clickDigitElement('0');
      clickDigitElement('0');
      clickOperationElement('=');
      getResult().should('have.text', '9');
    });
  });
});