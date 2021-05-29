context('calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/')
  })

  it('초기값은 0이다.', () => {
    cy.get('#total').should('have.text', 0)
  })

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digits').contains(1).click()
    cy.get('.operations').contains('+').click()
    cy.get('.digits').contains(1).click()
    cy.get('#total').should('have.text', '1+1')
    cy.get('.operations').contains('=').click()
    cy.get('#total').should('have.text', '2')
  })
})