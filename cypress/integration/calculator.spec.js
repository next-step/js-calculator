describe('ui-calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('숫자를 클릭 시, 디스플레이에 표기된다', () => {
    cy.get('.nine').click();
    cy.get('#total').should('have.text', '9');
  });
})