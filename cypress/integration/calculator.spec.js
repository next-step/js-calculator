import { ERROR_MESSAGE } from '../../src/js/constants';

describe('계산기 초기 화면 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('total의 초기 값은 0이다.', () => {
    cy.get('#total').should('have.text', '0');
  });
});

describe('계산기 기능 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    cy.get('.digit').contains('5').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '8');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('7').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.get('.digit').contains('6').click();
    cy.get('.operation').contains('X').click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '24');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.get('.digit').contains('6').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '2');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화된다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains(ERROR_MESSAGE.OVER_THREE_DIGITS);
    });
    cy.get('#total').should('have.text', '111');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('.digit').contains('5').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '1');
  });
});

describe('추가 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('초기 화면에 operator를 클릭하면 alert창을 호출한다.', () => {
    cy.get('.operation').contains('+').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains(ERROR_MESSAGE.NO_NUMBER);
    });
    cy.get('#total').should('have.text', '0');
  });
});
