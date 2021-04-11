/// <reference types="cypress" />

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('#total').contains('0')
  })

  it('숫자를 누르면 h1#total에 들어간다.', () => {
    cy.inputRepeatNumber(4)
    cy.get('#total').contains(/[0-9]+/gim)
  })

  it('초기값 숫자가 0인 경우 0을 계속 눌러도 0으로 표시한다.', () => {
    cy.inputRepeatNumber(10, 0)
    cy.get('#total').contains('0')
  })

  it('초기값 숫자가 0인 경우 0이 아닌 숫자를 누르면 제일 앞에 0을 지우고 변경하기', () => {
    cy.inputIgnoreTargetNumber(0)
    cy.get('#total').contains(/^[1-9]$/gim)
  })

  it('앞에 숫자가 하나 있고 /X-+연산자 버튼을 누르면 연산자가 표시 되게. =연산자 제외', () => {
    cy.inputRepeatNumber(4)
    cy.inputIgnoreTargetOperator('=')
    cy.get('#total').contains(/^-?[0-9]+[+/X-]$/gim)
  })

  it('= 연산자를 경우 표시하지 않는다', () => {
    cy.inputRandomNumericalExpression('+', 4)

    cy.get('.operation:nth-child(5)').click()
    cy.get('#total').should('not.contain.text', '=')
  })

  // 기능 요구사항
  // - 2개의 숫자에 대해 덧셈이 가능
  it('2개의 숫자에 대해 덧셈이 가능.', () => {
    cy.inputRandomNumericalExpression('+', 4)
    cy.calculateNumericalExpression()
  })

  // 기능 요구사항
  // - 2개의 숫자에 대해 뺄셈이 가능
  it.only('2개의 숫자에 대해 뺄셈이 가능.', () => {
    cy.inputRandomNumericalExpression('-', 4)
    cy.calculateNumericalExpression()
  })
})
