/**
 * @see https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
 */
Cypress.Commands.add('clickDigit', (digit) => {
  cy.get('.digit').contains(digit).click();
});
Cypress.Commands.add('clickOperator', (operator) => {
  cy.get('.operation').contains(operator).click();
});
Cypress.Commands.add('clickAllClear', () => {
  cy.get('.modifier').click();
});
Cypress.Commands.add('getTotal', (total) => {
  cy.get('#total').should('have.text', total);
});
