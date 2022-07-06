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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { 

import { SELECTORS_CLASS, SELECTORS_ID } from '../../src/js/constants';

  
Cypress.Commands.add('userClick', (selector,  value) => {
  cy.get(selector).contains(value).click();
});

Cypress.Commands.add('getResult', () => {
  cy.get(SELECTORS_CLASS.OPERATION).contains('=').click();
});

Cypress.Commands.add('checkResult', (value) => {
  cy.get(SELECTORS_ID.TOTAL).should('have.text', value);
});

