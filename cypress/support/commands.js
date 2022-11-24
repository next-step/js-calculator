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

Cypress.Commands.add("clickDigit", (digit) =>
  cy.get(".digit").contains(digit).click()
);

Cypress.Commands.add("clickOperator", (operation) =>
  cy.get(".operation").contains(operation).click()
);

Cypress.Commands.add("totalIs", (total) => {
  cy.get(".operation").contains("=").click();
  cy.get("#total").should("have.text", total);
});

Cypress.Commands.add("allClear", () => cy.get(".modifier").click());
