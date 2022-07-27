describe('계산기 테스트 입니다.', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('+').click()
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('=').click()

    cy.get('#total').should('have.text', '70')
  })

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('-').click()
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('=').click()

    cy.get('#total').should('have.text', '0')
  })

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('X').click()
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('=').click()

    cy.get('#total').should('have.text', '1225')
  })

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.operation').contains('/').click()
    cy.get('button.digit').contains('8').click()
    cy.get('button.operation').contains('=').click()

    cy.get('#total').should('have.text', '4')
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('5').click()
    cy.get('button.modifier').contains('AC').click()

    cy.get('#total').should('have.text', '0')
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('3').click()
    cy.get('button.digit').contains('3').click()

    cy.on('window:alert', (t) => {
      expect(t).to.contains('숫자는 세 자리까지만 입력 가능합니다!')
    })
  })

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('button.digit').contains('3').click()
    cy.get('button.operation').contains('/').click()
    cy.get('button.digit').contains('7').click()
    cy.get('button.operation').contains('=').click()

    cy.get('#total').should('have.text', '0')
  })
})
