import {
  MESSAGE,
  PLUS,
  MINUS,
  MULTIPLICATION,
  DIVISION,
} from '../../src/js/utils/constants.js';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const calculate = (num1, num2, operator) => {
    const operation = {
      [PLUS]: (num1, num2) => num1 + num2,
      [MINUS]: (num1, num2) => num1 - num2,
      [MULTIPLICATION]: (num1, num2) => num1 * num2,
      [DIVISION]: (num1, num2) => Math.floor(num1 / num2),
    };
    return operation[operator](num1, num2);
  };

  const clickNumber = (number = 123) => {
    String(number)
      .split('')
      .map(num => cy.get('.digits').contains(num).click());
  };

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    clickNumber(123);
    cy.contains('+').click();
    clickNumber(123);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculate(123, 123, '+'));
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    clickNumber(123);
    cy.contains('-').click();
    clickNumber(123);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculate(123, 123, '-'));
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    clickNumber(123);
    cy.contains('X').click();
    clickNumber(123);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculate(123, 123, 'X'));
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    clickNumber(123);
    cy.contains('/').click();
    clickNumber(123);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculate(123, 123, '/'));
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickNumber(123);
    cy.contains('AC').click();

    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    clickNumber(1234);

    cy.on('window:alert', txt => {
      expect(txt).to.equal(MESSAGE.MAX_NUMBER);
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickNumber(123);
    cy.contains('/').click();
    clickNumber(7);
    cy.contains('=').click();

    cy.get('#total').should('have.text', Math.floor(123 / 7));
  });
});
