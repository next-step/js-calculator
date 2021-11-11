import { MODIFIER, OPERATION } from '../../src/js/constants/calculator.js';
import { CALCULATOR_ERROR } from '../../src/js/constants/errorMessage.js';

const TEST_URL = 'http://127.0.0.1:5500/';

const clickDigit = (digit) => cy.get('.digit').contains(digit).click();
const clickOperator = (operator) => cy.get('.operation').contains(operator).click();
const clickModifier = (modifier) => cy.get('.modifier').contains(modifier).click();

const calculate = (operand1, operator, operand2) => {
  clickDigit(operand1);
  clickOperator(operator);
  clickDigit(operand2);
  clickOperator(OPERATION.EQUAL);
};

describe('계산기', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('숫자 버튼을 누르면 결과화면에 나타난다.', () => {
    clickDigit(1);
    cy.get('#total').should('have.text', 1);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const MAX_LENGTH = 3;

    for (let i = 0; i <= MAX_LENGTH * 2; i++) {
      clickDigit(1);
    }

    cy.get('#total').should('have.text', '1'.repeat(MAX_LENGTH));
  });

  it('연산자 버튼을 누르면 결과화면에 나타난다.', () => {
    clickDigit(1);
    clickOperator(OPERATION.ADD);

    cy.get('#total').should('include.text', OPERATION.ADD);
  });

  it('연산자 버튼을 여러 번 누르면 마지막에 누른 연산자로 갱신된다.', () => {
    clickDigit(1);
    clickOperator(OPERATION.ADD);
    clickOperator(OPERATION.DIVIDE);
    clickOperator(OPERATION.MULTIPLY);

    cy.get('#total').should('include.text', OPERATION.MULTIPLY);
  });

  describe('= 연산자 버튼을 누르면 사칙연산을 진행한다', () => {
    it('덧셈', () => {
      calculate(1, OPERATION.ADD, 2);
      cy.get('#total').should('have.text', 3);
    });

    it('뺄셈', () => {
      calculate(2, OPERATION.SUBTRACT, 2);
      cy.get('#total').should('have.text', 0);
    });

    it('곱셈', () => {
      calculate(3, OPERATION.MULTIPLY, 2);
      cy.get('#total').should('have.text', 6);
    });

    it('나눗셈', () => {
      calculate(1, OPERATION.DIVIDE, 2);
      cy.get('#total').should('have.text', 0);
    });
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickDigit(1);
    clickDigit(2);
    clickDigit(3);
    clickModifier(MODIFIER.AC);
    cy.get('#total').should('have.text', 0);
  });

  it('숫자를 입력하지 않고, 연산자를 입력할 수 없다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    clickOperator(OPERATION.ADD).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(CALCULATOR_ERROR.OPERATION_WITH_NO_NUMBER);
    });
  });
});
