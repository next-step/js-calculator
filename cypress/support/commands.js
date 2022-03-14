import { DOM } from '../../src/js/constants.js';

beforeEach(() => {
  cy.visit('/');
});

Cypress.Commands.add('clickDigit', digit =>
  cy.get(`${DOM.digits} > ${DOM.digit}`).contains(digit).click(),
);

Cypress.Commands.add('clickOperation', operation =>
  cy.get(`${DOM.operations} > ${DOM.operation}`).contains(operation).click(),
);

Cypress.Commands.add('clickModifier', modifier =>
  cy.get(`${DOM.modifiers} > ${DOM.modifier}`).contains(modifier).click(),
);

Cypress.Commands.add('checkAlertMessage', message =>
  cy.on('window:alert', text => {
    expect(text).to.contains(message);
  }),
);

Cypress.Commands.add('totalShouldBe', result => cy.get(DOM.total).should('have.text', result));
