const operatorConvertTable = {
  '+': 'add',
  '-': 'sub',
  X: 'mul',
  '/': 'div',
  '=': 'equal',
};

Cypress.Commands.add('getTotalDisplay', () => {
  cy.get(`[data-test=total]`);
});

Cypress.Commands.add('getModifierPanel', () => {
  cy.get(`[data-test=btn-ac]`);
});

Cypress.Commands.add('getNumberPanel', (number) => {
  cy.get(`[data-test=btn-${number}]`);
});

Cypress.Commands.add('getOperatorPanel', (operator) => {
  cy.get(`[data-test=btn-${operatorConvertTable[operator]}]`);
});

Cypress.Commands.add('clickACPanel', () => {
  cy.get(`[data-test=btn-ac]`).click();
});

Cypress.Commands.add('clickNumberPanel', (number) => {
  cy.get(`[data-test=btn-${number}]`).click();
});

Cypress.Commands.add('clickOperatorPanel', (operator) => {
  cy.get(`[data-test=btn-${operatorConvertTable[operator]}]`).click();
});
