/// <reference types="cypress" />

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('#total').should('contain', '0')
  })

  // 숫자를 누르면 h1#total에 들어간다.
  it('숫자를 누르면 h1#total에 들어간다.', () => {
    cy.get('.digit').click({ multiple: true })
    cy.get('#total').should('contain', '09876543210')
  })
})
