import { OPERATOR, MODIFIER } from "../../src/js/common/define.js";

describe('calculator test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8888/')
  })

  const calculate = (valueList) => {
    const [num1, operator, num2] = valueList;
    const calculation = {
      [OPERATOR.PLUS]: (num1, num2) => (num1 + num2),
      [OPERATOR.MINUS]: (num1, num2) => (num1 - num2),
      [OPERATOR.MULTIPLIED]: (num1, num2) => (num1 * num2),
      [OPERATOR.DIVIDED]: (num1, num2) => (Math.floor(num1 / num2)),
    }
    return calculation[operator](num1, num2);
  };

  const clickNumber = (num) => {
    [...`${num}`].map((str) => {
      cy.get('.digit').contains(str).click();
    })
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
      cy.get('#total').should('have.text', 111);
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    testCalculate(10, 3, OPERATOR.DIVIDED);
  });
});
