describe('계산기 테스트', () => {
  it('visit', () => {
    cy.visit('http://localhost:9000/')
  })
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(3).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(4).click()

    cy.get('#total').contains(18)
    cy.get('.modifier').first().click()
  })
  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(2).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(4).click()

    cy.get('#total').contains(0)
    cy.get('.modifier').first().click()
  })
  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(1).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(4).click()

    cy.get('#total').contains(81)
    cy.get('.modifier').first().click()
  })
  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(0).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(4).click()

    cy.get('#total').contains(1)
  })
  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.modifier').first().click()
    cy.get('#total').contains(0)
  })
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.digits>button').eq(0).click()
    cy.get('.digits>button').eq(0).click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`숫자는 세자리까지 입력 가능합니다.`)
    })
    cy.get('.modifier').first().click()
  })

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('.digits>button').eq(0).click()
    cy.get('.operations>button').eq(0).click()
    cy.get('.digits>button').eq(1).click()
    cy.get('.operations>button').eq(4).click()

    cy.get('#total').contains(1)
  })
})
