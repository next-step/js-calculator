import { operation, MESSAGE } from '../../src/utils/utils'

Cypress.Commands.add('calculate', (type) => {
  cy.get('.digits').contains(1).click()
  cy.get('.digits').contains(1).click()
  cy.get('.digits').contains(2).click()
  cy.get('.operations').contains(type).click()
  cy.get('.digits').contains(5).click()
  cy.get('#total').should('have.text', `112${type}5`)
  cy.get('.operations').contains('=').click()
  cy.get('#total').should('have.text', operation[type]('112', '5'))
})

context('calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/')
  })

  it('초기값은 0이다.', () => {
    cy.get('#total').should('have.text', 0)
  })

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.calculate('+')
  })

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.calculate('-')
  })

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.calculate('X')
  })

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.calculate('/')
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.digits').contains(1).click()
    cy.get('.modifier').click()
    cy.get('#total').should('have.text', 0)
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('.digits').contains(1).click()
    cy.get('.digits').contains(1).click()
    cy.get('.digits').contains(1).click()

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('.digits').contains(1).click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(MESSAGE.DIGITS_ALERT_MESSAGE)
      })
  })
})