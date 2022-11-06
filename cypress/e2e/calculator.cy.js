describe("Calculator", () => {
  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.visit(Cypress.config().baseUrl);
    cy.get(".modifier").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한 번에 최대 3자리 수까지 입력 가능하다", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").first().click();
    cy.get(".digit").first().click();
    cy.get(".digit").first().click();
    cy.get(".digit").first().click();

    cy.get("#total").should("have.length", 1);
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").eq(8).click();
    cy.get(".digit").eq(8).click();
    cy.get(".digit").eq(8).click();
    cy.contains("+").click();
    cy.get(".digit").eq(7).click();
    cy.contains("=").click();
    cy.get("#total").should("have.text", "113");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").eq(0).click();
    cy.contains("-").click();
    cy.get(".digit").eq(7).click();
    cy.contains("=").click();
    cy.get("#total").should("have.text", "7");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").eq(1).click();
    cy.contains("X").click();
    cy.get(".digit").eq(5).click();
    cy.contains("=").click();
    cy.get("#total").should("have.text", "32");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").eq(6).click();
    cy.get(".digit").eq(7).click();
    cy.contains("/").click();
    cy.get(".digit").eq(1).click();
    cy.contains("=").click();
    cy.get("#total").should("have.text", "4");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.visit(Cypress.config().baseUrl);

    cy.get(".digit").eq(6).click();
    cy.get(".digit").eq(7).click();
    cy.contains("/").click();
    cy.get(".digit").eq(4).click();
    cy.contains("=").click();
    cy.get("#total").should("have.text", "6");
  });
});
