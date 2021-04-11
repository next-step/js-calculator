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

  // 숫자가 0인 경우 0을 계속 눌러도 0으로 표시한다.
  it('숫자를 누르면 h1#total에 들어간다.', () => {
    times(10, () => {
      cy.get('.digit:nth-child(10)').click()
    })

    cy.get('#total').should('include.text').eq('0')
  })
})
