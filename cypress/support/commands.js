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
  digitBtn: (number) => clickElement(`button.digit[data-value="${number}"]`),
  operationBtn: (operator) =>
    clickElement(`button.operation[data-value="${operator}"]`),
};

Cypress.Commands.add('clickElement', clickElement);

Cypress.Commands.add('getTotalValue', () => cy.get('#total').invoke('text'));

Cypress.Commands.add('executeOperation', ([x, y, operator, result = '=']) => {
  const { digitBtn, operationBtn } = clickEventCommand;
  digitBtn(x);
  operationBtn(operator);
  digitBtn(y);
  operationBtn(result);
});

Cypress.Commands.add('resetAll', () => clickEventCommand.modifierBtn());
