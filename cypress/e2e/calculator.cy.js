import { OPERATORS, OPERATION_EXECUTOR } from '../../src/js/constants.js';

const testCase = [
  [12, 2],
  [3, 10],
  [0, 10],
  [234, 111],
];

before(() => {
  cy.visit('/');
});

describe('Calculator Test', () => {
  beforeEach(() => cy.clickModifier());

  const testFunc = (description, operator) => {
    describe(description, () => {
      testCase.forEach(([operand1, operand2]) => {
        it([operand1, operand2].join(), () => {
          cy.clickDigit(operand1);
          cy.clickOperator(operator);
          cy.clickDigit(operand2);
          cy.clickOperator(OPERATORS.EQUAL);
          cy.result(OPERATION_EXECUTOR[operator](operand1, operand2));
        });
      });
    });
  };

  testFunc('2개의 숫자에 대해 덧셈이 가능하다.', OPERATORS.ADD);
  testFunc('2개의 숫자에 대해 뺄셈이 가능하다.', OPERATORS.SUBTRACT);
  testFunc('2개의 숫자에 대해 곱셈이 가능하다.', OPERATORS.MULTIPLY);
  testFunc('2개의 숫자에 대해 나눗셈이 가능하다.', OPERATORS.DIVIDE);

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.clickDigit(12);
    cy.clickOperator(OPERATORS.DIVIDE);
    cy.clickDigit(2);
    cy.clickModifier();
    cy.result(0);
  });

  describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    it('첫번째 피연산자', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.clickDigit(3452).then(() => {
        expect(stub.getCall(0)).to.be.calledWith('최대 연산 가능 자릿수는 3자리입니다.');
      });
    });

    it('두번째 피연산자', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.clickDigit(100);
      cy.clickOperator(OPERATORS.ADD);
      cy.clickDigit(3452).then(() => {
        expect(stub.getCall(0)).to.be.calledWith('최대 연산 가능 자릿수는 3자리입니다.');
      });
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clickDigit(11);
    cy.clickOperator(OPERATORS.DIVIDE);
    cy.clickDigit(2);
    cy.clickOperator(OPERATORS.EQUAL);
    cy.get('#total').should((value) => {
      expect(Number.isInteger(Number(value.text()))).to.be.true;
    });
  });
});
