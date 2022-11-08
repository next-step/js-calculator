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
import { OPERATION, ALERT_MESSAGE } from '../../src/js/constants.js';

Cypress.Commands.add('clickDigit', (numbers) => {
  numbers.forEach((number) => cy.get(`button[data-digit="${number}"]`).click());
});
Cypress.Commands.add('clickOperation', (operation) => {
  cy.get(`button[data-operation="${operation}"]`).click();
});
Cypress.Commands.add('clickModifier', () => {
  cy.get(`button[data-modifier="AC"]`).click();
});
Cypress.Commands.add('getTotal', (total) => {
  cy.get('#total').should('have.text', `${total}`);
});
Cypress.Commands.add('calculation', (firstNumber, operation, secondNumber, expectedTotal) => {
  cy.clickDigit(firstNumber);
  cy.clickOperation(operation);
  cy.clickDigit(secondNumber);
  cy.clickOperation(OPERATION.EQUAL);
  cy.getTotal(expectedTotal);
});
Cypress.Commands.add('modifierTest', () => {
  cy.clickModifier();
  cy.getTotal(0);
});
Cypress.Commands.add('continueCalculation', (operation, secondNumber, expectedTotal) => {
  cy.clickOperation(operation);
  cy.clickDigit(secondNumber);
  cy.clickOperation(OPERATION.EQUAL);
  cy.getTotal(expectedTotal);
});
Cypress.Commands.add('alertNotOverNumberLength', () => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(ALERT_MESSAGE.NOT_OVER_NUMBER_LENGTH);
  });
});
Cypress.Commands.add('alertNotFirstNumber', (operation) => {
  cy.clickOperation(operation);
  cy.on('window:alert', (text) => {
    expect(text).to.contains(ALERT_MESSAGE.NOT_FIRST_NUMBER);
  });
});
Cypress.Commands.add('alertNotSecondNumber', (firstNumber, operation) => {
  cy.clickDigit(firstNumber);
  cy.clickModifier(operation);
  cy.clickModifier(OPERATION.EQUAL);
  cy.on('window:alert', (text) => {
    expect(text).to.contains(ALERT_MESSAGE.NOT_SECOND_NUMBER);
  });
});
