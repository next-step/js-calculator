describe('ui-calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')

  })

  const clickNumber = (number = 999) => {
    String(number)
      .split('')
      .map((num) => cy.get('.digits').contains(num).click())
  }

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    clickNumber(444)
    cy.get('.operations').contains('+').click()
    clickNumber(444)
    cy.get('.operations').contains('=').click()
    cy.get('#total').should('have.text', '888')
  })

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    clickNumber(23)
    cy.get('.operations').contains('-').click()
    clickNumber(100)
    cy.get('.operations').contains('=').click()
    cy.get('#total').should('have.text', '-77')
  })

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    clickNumber(444)
    cy.get('.operations').contains('X').click()
    clickNumber(444)
    cy.get('.operations').contains('=').click()
    cy.get('#total').should('have.text', '197136')
  })

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    clickNumber(444)
    cy.get('.operations').contains('/').click()
    clickNumber(444)
    cy.get('.operations').contains('=').click()
    cy.get('#total').should('have.text', '1')
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickNumber(444)
    cy.get('.operations').contains('/').click()
    clickNumber(444)
    cy.get('.modifiers').contains('AC').click()

    cy.get('#total').should('have.text', '0')

    clickNumber(444)
    cy.get('.operations').contains('/').click()
    cy.get('.modifiers').contains('AC').click()

    cy.get('#total').should('have.text', '0')
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    clickNumber(4445)
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('숫자는 세 자리까지만 입력 가능합니다!')
    })
  })

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickNumber(3)
    cy.get('.operations').contains('/').click()
    clickNumber(15)
    cy.get('.operations').contains('=').click()

    cy.get('#total').should('have.text', '0')
  })

})
