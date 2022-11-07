// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("clickDigit", (digits) => {
  for (const digit of digits) {
    cy.get(".digit").contains(digit).click();
  }
});

Cypress.Commands.add("clickOperator", (operator) => {
  cy.get(".operation").contains(operator).click();
});

Cypress.Commands.add("clickAllClear", () => {
  cy.get(".modifier").click();
});

Cypress.Commands.add("getTotal", (total) => {
  cy.get("#total").should("have.text", `${total}`);
});

Cypress.Commands.add("calculator", (prevDigit, operator, nextDigit) => {
  cy.clickDigit(prevDigit);
  cy.clickOperator(operator);
  cy.clickDigit(nextDigit);
  cy.clickOperator("=");
});
