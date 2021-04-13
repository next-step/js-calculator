import { OPERATOR, MODIFIER } from "../../src/js/common/define.js";

describe('calculator test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8888/')
  })

  const calculate = (valueList) => {
    const [num1, operator, num2] = valueList;
    let result;
    switch (operator) {
      case OPERATOR.PLUS:
        result = num1 + num2;
        break;
      case OPERATOR.MINUS:
        result = num1 - num2;
        break;
      case OPERATOR.MULTIPLIED:
        result = num1 * num2;
        break;
      case OPERATOR.DIVIDED:
        result = Math.floor(num1 / num2);
        break;
      default:
        break;
    }
    return result;
  };

  const clickNumber = (num) => {
    const str = num.toString();
    for (let ix = 0; ix < str.length; ix++) {
      cy.get('.digit').contains(str[ix]).click();
    }
  };

  const testCalculate = (num1, num2, operator) => {
    clickNumber(num1);
    cy.get('.operation').contains(operator).click();
    clickNumber(num2);
    cy.get('.operation').contains(OPERATOR.EQUAL).click();
    cy.get('#total').should('have.text', calculate([num1, operator, num2]));
  };

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    testCalculate(111, 333, OPERATOR.PLUS);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    testCalculate(111, 333, OPERATOR.MINUS);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    testCalculate(111, 333, OPERATOR.MULTIPLIED);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    testCalculate(111, 333, OPERATOR.DIVIDED);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    testCalculate(111, 333, OPERATOR.PLUS);
    cy.get('.modifier').contains(MODIFIER.AC).click();
    cy.get('#total').should('have.text', 0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    clickNumber(111);
    cy.get('.digit').contains('1').click().then(() => {
      cy.on('window:alert', (str) => {
        expect(str).should('not.be.empty');
      });
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    testCalculate(10, 3, OPERATOR.DIVIDED);
    cy.get('#total').should('not.contain', '.');
  });
});
