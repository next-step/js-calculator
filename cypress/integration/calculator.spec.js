import { calculation } from '../../src/js/utils/calculation.js';
import { PLUS, MINUS, MULTIPLICATION, DIVISION, MESSAGE, INITIAL_VALUE } from '../../src/js/utils/constant.js';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const clickNumberAndCalculation = ({ num1 = '999', num2 = '999', operator = '' }) => {
    if (!operator) {
      throw Error(MESSAGE.NEED_OPERATOR);
    }

    num1.split('').map((number) => {
      cy.get('.digits').contains(number).click();
    });
    cy.contains(operator).click();
    num2.split('').map((number) => {
      cy.get('.digits').contains(number).click();
    });
    cy.contains('=').click();
  };

  it('2개의 숫자에 대해 덧셈이 가능해야 한다.', () => {
    clickNumberAndCalculation({ operator: PLUS });
    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: PLUS }));
  });

  it('2개의 숫자에 대해 뺄셈이 가능해야 한다.', () => {
    clickNumberAndCalculation({ operator: MINUS });
    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: MINUS }));
  });

  it('2개의 숫자에 대해 곱셈이 가능해야 한다.', () => {
    clickNumberAndCalculation({ operator: MULTIPLICATION });
    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: MULTIPLICATION }));
  });

  it('2개의 숫자에 대해 나눗셈이 가능해야 한다.', () => {
    clickNumberAndCalculation({ operator: DIVISION });
    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: DIVISION }));
  });

  it('나눗셈을 할 때 소수점 이하는 버려야 한다.', () => {
    clickNumberAndCalculation({ num2: '8', operator: DIVISION });
    cy.get('#total').should('have.text', Math.round(999 / 8));
  });

  it('숫자는 3자리까지만 입력이 가능해야 한다.', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));

    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();

    cy.get('@windowAlert').should('be.calledWith', MESSAGE.INVALID_DIGIT_LENGTH);
  });

  it('"AC" 버튼을 클릭했을 때 결과화면이 0으로 초기화 되어야 한다.', () => {
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.contains('AC').click();

    cy.get('#total').should('have.text', INITIAL_VALUE);
  });
});
