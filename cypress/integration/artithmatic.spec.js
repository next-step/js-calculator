describe('사칙 연산 테스트', () => {
  const REPEAT = +Cypress.env('REPEAT');
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    cy.plusTest(REPEAT);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    cy.minusTest(REPEAT);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.multiplyTest(REPEAT);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.divideTest(REPEAT);
  });
});
