import '@testing-library/cypress/add-commands';

Cypress.Commands.add('clicks', (string, options = {}) => {
  const { atom = false } = options;

  if (atom) {
    cy.findByRole('button', { name: string }).click();
    return;
  }

  string.split('').forEach((value) => {
    cy.findByRole('button', { name: value }).click();
  });
});
