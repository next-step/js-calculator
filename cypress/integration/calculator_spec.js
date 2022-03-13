/// <reference types="Cypress" />

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
