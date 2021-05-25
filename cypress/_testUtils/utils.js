function calculate({ num1, num2, operator }) {
  String(num1)
    .split("")
    .forEach((val) => {
      cy.get(".digit").contains(val).click();
    });

  cy.get(".operation").contains(operator).click();

  String(num2)
    .split("")
    .forEach((val) => {
      cy.get(".digit").contains(val).click();
    });

  cy.get(".operation").contains("=").click();
}

export { calculate };
