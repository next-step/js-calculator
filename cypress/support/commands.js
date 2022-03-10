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

const clickElement = (selector) => cy.get(selector).click();

const clickEventCommand = {
  modifierBtn: () => clickElement('button.modifier'),
  digitBtn: (number) => clickElement(`button.digit[data-num="${number}"]`),
  operationBtn: (operator) =>
    clickElement(`button.operation[data-operator="${operator}"]`),
};

Cypress.Commands.add('totalValue', () => cy.get('#total').invoke('text'));

Cypress.Commands.add(
  'executeOperation',
  ([left, right, operator, result = '=']) => {
    const { digitBtn, operationBtn } = clickEventCommand;
    digitBtn(left);
    operationBtn(operator);
    digitBtn(right);
    operationBtn(result);
  }
);

Cypress.Commands.add('resetAll', () => clickEventCommand.modifierBtn());
