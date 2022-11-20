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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add("clickDigit", (input) => {
  const digits = input.split("");
  digits.forEach((digit) => {
    cy.get(`[data-cy="digit-${digit}"]`).click();
  });
});

Cypress.Commands.add("clickOperator", (operator) => {
  cy.get(`[data-cy="operator-${operator}"]`).click();
});

Cypress.Commands.add("expectResult", (expected) => {
  cy.get('[data-cy="total"]').should("have.text", expected);
});

Cypress.Commands.add("calculate", ({ prev, next, operator }) => {
  cy.clickDigit(prev);
  cy.clickOperator(operator);
  cy.clickDigit(next);
  cy.clickOperator("result");
});
