Cypress.Commands.add('clickNumber', (number) => {
  cy.get(`.digit[data-digit="${number}"]`).click();
});

Cypress.Commands.add('clickMultiNumber', (multiNumber) => {
  String(multiNumber)
    .split('')
    .forEach((number) => cy.clickNumber(number));
});

Cypress.Commands.add('clickOperation', (operation) => {
  cy.get(`.operation[data-operation="${operation}"]`).click();
});

Cypress.Commands.add('clickModifier', () => {
  cy.get('.modifier').click();
});

Cypress.Commands.add('getResult', (result) => {
  cy.get('#total').should('have.text', result);
});
