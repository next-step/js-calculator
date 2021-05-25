describe('reset all (AC button)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5501')
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get(`[data-cy=3]`).click() 
    cy.get(`[data-cy='+']`).click()
  
    cy.get(`[data-cy="AC"]`).click()
  
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(0)
    })
  })
  
})