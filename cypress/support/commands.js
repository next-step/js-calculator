Cypress.Commands.add('getByDataset', (dataset) => {
  cy.get(`[data-cy='${dataset}']`);
});
