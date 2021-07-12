import { ERROR, MAX_OPERAND_LENGTH, OPERATOR, OPERATION } from '../../src/js/constants/index.js';

const clickDigit = (digit) => {
  cy.get('.digit').contains(`${digit}`).click();
}

const clickOperator = (operator) => {
  cy.get(`#${OPERATION[operator]}`).click();
}

const checkTotal = (value) => {
  cy.contains('#total', `${value}`);
}

describe('Test calculator', function () {
  it('2개의 숫자에 대해 덧셈이 가능하다. (2 + 3 = 5)', function () {
    cy.visit('/');
    clickDigit(2);
    clickOperator(OPERATOR.PLUS);
    clickDigit(3);
    clickOperator(OPERATOR.EQUAL);
    checkTotal(5);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다. (5 - 1 = 4)', function () {
    clickOperator(OPERATOR.MINUS);
    clickDigit(1);
    clickOperator(OPERATOR.EQUAL);
    checkTotal(4);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다. (4 * 2 = 8)', function () {
    clickOperator(OPERATOR.MULTIPLY);
    clickDigit(2);
    clickOperator(OPERATOR.EQUAL);
    checkTotal(8);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다. (8 / 2 = 4)', function () {
    clickOperator(OPERATOR.DIVIDE);
    clickDigit(2);
    clickOperator(OPERATOR.EQUAL);
    checkTotal(4);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다. (4 / 3 = 1)', function () {
    clickOperator(OPERATOR.DIVIDE);
    clickDigit(3);
    clickOperator(OPERATOR.EQUAL);
    checkTotal(1);
  });

  it('숫자는 한 번에 2개씩만 계산할 수 있다.', function () {
    clickOperator(OPERATOR.PLUS);
    clickDigit(2);
    clickOperator(OPERATOR.PLUS);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        ERROR.OVER_MAX_OPERAND_COUNT(MAX_OPERAND_LENGTH)
      );
    });
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', function () {
    cy.get('#modifier').click();
    checkTotal(0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', function () {
    clickDigit(3);
    clickDigit(3);
    clickDigit(3);
    clickDigit(3);

    checkTotal(333);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(ERROR.OVER_MAX_DIGIT(3));
    });
  });
});
