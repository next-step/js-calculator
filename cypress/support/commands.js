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

