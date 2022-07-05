describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit('9');
    cy.clickOperation('+');
    cy.clickDigit('1');
    cy.clickOperation('=');
    cy.checkTotalValue('10');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit('7');
    cy.clickOperation('-');
    cy.clickDigit('2');
    cy.clickOperation('=');
    cy.checkTotalValue('5');
  });

  it('2개의 숫자에 대해 곱셉이 가능하다.', () => {
    cy.clickDigit('7');
    cy.clickOperation('X');
    cy.clickDigit('7');
    cy.clickOperation('=');
    cy.checkTotalValue('49');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickDigit('0');
    cy.clickDigit('0');
    cy.clickOperation('/');
    cy.clickDigit('1');
    cy.clickDigit('0');
    cy.clickOperation('=');
    cy.checkTotalValue('10');
  });
});
