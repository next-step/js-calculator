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

Cypress.Commands.add("clickNumberButton", (number) => {
    cy.get(`button[data-digit="${number}"]`).click();
});

Cypress.Commands.add("clickOperationButton", (operation) => {
    cy.get(`button[data-operation="${operation}"]`).click();
});

Cypress.Commands.add("clickModifierButton", (modifier) => {
    cy.get(`button[data-modifier="${modifier}"]`).click();
});

Cypress.Commands.add("calcTotalValueShouldBe", (value) => {
    cy.get("#total").should("have.text", `${value}`);
});