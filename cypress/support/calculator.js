import './commands';

export const clickElementNTimes = (element, n) => {
  for (let i = 0; i < n; i++) {
    cy.getByDataset(element).click();
  }
};

export const checkResultAfterClickTwoNumberAndOperator = (operand1, operand2, operator, result) => {
  cy.getByDataset(operand1).click();
  cy.getByDataset('total').should('have.text', operand1);

  cy.getByDataset(operator).click();
  cy.getByDataset('total').should('have.text', `${operand1}${operator}`);

  cy.getByDataset(operand2).click();
  cy.getByDataset('total').should('have.text', `${operand1}${operator}${operand2}`);

  cy.getByDataset('=').click();
  cy.getByDataset('total').should('have.text', result);
};
