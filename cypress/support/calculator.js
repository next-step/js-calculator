import './commands';

export const getByDataset = (dataset) => cy.get(`[data-cy='${dataset}']`);

export const checkAlertMessage = (message) => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(message);
  });
};
