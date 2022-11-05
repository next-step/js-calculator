describe("calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("숫자 버튼을 눌렀을 때 결과물이 보인다.", () => {
    cy.clickDigit("1");
    cy.clickDigit("2");
    cy.clickDigit("3");
    cy.clickDigit("4");
    cy.clickDigit("5");
    cy.clickDigit("6");
    cy.clickDigit("7");
    cy.clickDigit("8");
    cy.clickDigit("9");
  });
  it("연산 버튼을 눌렀을 때 결과물이 보인다.", () => {
    cy.clickOperation("+");
    cy.clickOperation("-");
    cy.clickOperation("X");
    cy.clickOperation("/");
  });
});
