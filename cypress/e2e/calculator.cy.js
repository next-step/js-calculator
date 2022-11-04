/// <reference types="cypress" />
context('<Calculator />', () => {
  it('test', () => {
    cy.visit('/');
    expect(1 + 1).equal(2);
  });
});
