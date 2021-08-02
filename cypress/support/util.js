export const setAliase = () => {
  cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  cy.get('[data-cy=total]').as('total');
  cy.get('[data-cy=digit-wrapper]').as('digitWrapper');
  cy.get('[data-cy=digit]').as('digits');
  cy.get('[data-cy=modifiers-wrapper]').as('modifiersWrapper');
  cy.get('[data-cy=modifier]').as('modifier');
  cy.get('[data-cy=operations-wrapper]').as('operationsWrapper');
  cy.get('[data-cy=operation-equal]').as('operationEqual');
};
