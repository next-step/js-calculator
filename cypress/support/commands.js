import '@testing-library/cypress/add-commands';

Cypress.Commands.add('clickNumber', (number) => {
  cy.findByRole('button', { name: number }).click();
});

Cypress.Commands.add('clickOperator', (operator) => {
  cy.findByRole('button', { name: operator }).click();
});

Cypress.Commands.add('calculate', () => {
  cy.findByRole('button', { name: '=' }).click();
});

Cypress.Commands.add('clearAll', (modifier = 'AC') => {
  cy.findByRole('button', { name: modifier }).click();
});
