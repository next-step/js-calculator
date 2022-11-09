describe('계산기 테스트', () => {
  it('visit', () => {
    cy.visit('http://localhost:9000/')
  })
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('#modifier').click()
    cy.get('#num-0').click()
    cy.get('#add').click()
    cy.get('#num-1').click()
    cy.get('#operate').click()

    cy.get('#total').contains(1)
  })
  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('#modifier').click()
    cy.get('#num-0').click()
    cy.get('#subtract').click()
    cy.get('#num-1').click()
    cy.get('#operate').click()

    cy.get('#total').contains(-1)
  })
  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('#modifier').click()
    cy.get('#num-0').click()
    cy.get('#multiplication').click()
    cy.get('#num-1').click()
    cy.get('#operate').click()

    cy.get('#total').contains(0)
  })
  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('#modifier').click()
    cy.get('#num-4').click()
    cy.get('#division').click()
    cy.get('#num-2').click()
    cy.get('#operate').click()

    cy.get('#total').contains(2)
  })
})
