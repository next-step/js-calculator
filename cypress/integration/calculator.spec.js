import {
  CALCULATOR_INIT_VALUE,
  CALCULATOR_SYMBOL_SUM,
  CALCULATOR_SYMBOL_SUBTRACT,
  CALCULATOR_SYMBOL_MULTIPLY,
  CALCULATOR_SYMBOL_DIVIDE,
  CALCULATOR_SYMBOL_EQUAL,
} from './constants.js';

describe('계산기 테스트', () => {
  const digitClick = (digit) => {
    cy.get('.digit').contains(digit).click();
  };

  const operationClick = (operation) => {
    cy.get('.operation').contains(operation).click();
  };

  const allClearClick = () => {
    cy.get('.modifier').contains('AC').click();
  };

  const totalShouldHaveText = (value) => {
    cy.get('#total').should('have.text', value);
  };

  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('2개 숫자에 대해 덧셈이 가능하다.', () => {
    digitClick('1');
    operationClick(CALCULATOR_SYMBOL_SUM);
    digitClick('9');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('10');
  });

  it('2개 숫자에 대해 뺏셈이 가능하다.', () => {
    digitClick('9');
    operationClick(CALCULATOR_SYMBOL_SUBTRACT);
    digitClick('1');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('8');
  });

  it('2개 숫자에 대해 곱셈이 가능하다.', () => {
    digitClick('3');
    operationClick(CALCULATOR_SYMBOL_MULTIPLY);
    digitClick('2');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('6');
  });

  it('2개 숫자에 대해 나눗셈이 가능하다.', () => {
    digitClick('4');
    operationClick(CALCULATOR_SYMBOL_DIVIDE);
    digitClick('2');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('2');
  });

  it('2개 숫자에 대해 나눗셈이 가능하다.', () => {
    digitClick('4');
    operationClick(CALCULATOR_SYMBOL_DIVIDE);
    digitClick('2');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('2');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 된다.', () => {
    digitClick('3');
    operationClick(CALCULATOR_SYMBOL_SUM);
    digitClick('3');
    allClearClick();
    totalShouldHaveText(CALCULATOR_INIT_VALUE);
  });

  it('숫자는 한번에 3자리 수 까지 입력 가능하다.', () => {
    digitClick('1');
    digitClick('2');
    digitClick('3');
    digitClick('4');
    totalShouldHaveText('123');
  });

  it('계산 결과를 표현할 떄는 소수점 이하는 버린다.', () => {
    digitClick('7');
    operationClick(CALCULATOR_SYMBOL_DIVIDE);
    digitClick('2');
    operationClick(CALCULATOR_SYMBOL_EQUAL);
    totalShouldHaveText('3');
  });
});
