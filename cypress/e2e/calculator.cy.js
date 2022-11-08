const OPERATOR = {
  SUM: '+',
  SUBTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  ASSIGNMENT: '=',
};

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit(5);
    cy.clickOperator(OPERATOR.SUM);
    cy.clickDigit(3);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(8);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit(5);
    cy.clickOperator(OPERATOR.SUBTRACT);
    cy.clickDigit(3);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(2);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.clickDigit(4);
    cy.clickOperator(OPERATOR.MULTIPLY);
    cy.clickDigit(7);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(28);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit(9);
    cy.clickOperator(OPERATOR.DIVIDE);
    cy.clickDigit(3);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(3);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.clickDigit(5);
    cy.clickOperator(OPERATOR.SUM);
    cy.clickDigit(3);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(8);
    cy.clickAllClear();
    cy.getTotal(0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.clickDigit(5);
    cy.clickDigit(6);
    cy.clickDigit(3);
    cy.clickDigit(1);
    cy.clickDigit(1);
    cy.getTotal(563);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clickDigit(9);
    cy.clickOperator(OPERATOR.DIVIDE);
    cy.clickDigit(4);
    cy.clickOperator(OPERATOR.ASSIGNMENT);
    cy.getTotal(2);
  });
});
