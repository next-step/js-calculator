// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("clickExpressionButton", (expression) => {
  cy.get(`button[data-test-expression="${expression}"]`).click();
});

Cypress.Commands.add("clickNumberButton", (numbers) => {
  numbers.forEach((num) => {
    cy.get(`button[data-test-number="${num}"]`).click();
  });
});

Cypress.Commands.add("clickClearButton", () => {
  cy.get(`button[data-test-clear="clear"]`).click();
});

Cypress.Commands.add("calcShouldBe", (value) => {
  cy.get("#total").should("have.text", `${value}`);
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
