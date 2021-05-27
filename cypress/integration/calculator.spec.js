context('calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/')
  })

  it('초기값은 0이다.', () => {
    cy.get('#total').should('have.text', 0)
  })
})