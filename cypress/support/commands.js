Cypress.Commands.add('clickDigit', (number) => {
  String(number)
    .split('')
    .forEach((el) => cy.get('.digits').contains(el).click());
});

Cypress.Commands.add('clickOperator', (operator) => {
  cy.get('.operations').contains(operator).click();
});

Cypress.Commands.add('clickModifier', () => {
  cy.get('.modifier').click();
});

Cypress.Commands.add('result', (result) => {
  cy.get('#total').should('have.text', result);
});
