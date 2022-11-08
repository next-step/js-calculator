describe("Calculator", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.clickAllClear();
    cy.getTotal(0);
  });

  it("숫자는 한 번에 최대 3자리 수까지 입력 가능하다", () => {
    cy.clickDigit([2, 3, 4, 1]);
    cy.getTotal(1);
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.calculator([1, 1, 1], "+", [2]);
    cy.getTotal(113);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.calculator([9], "-", [2]);
    cy.getTotal(7);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.calculator([8], "X", [4]);
    cy.getTotal(32);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.calculator([3, 2], "/", [8]);
    cy.getTotal(4);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.calculator([3, 2], "/", [5]);
    cy.getTotal(6);
  });
});
