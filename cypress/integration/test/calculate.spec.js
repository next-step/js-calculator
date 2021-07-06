/// <reference types="cypress" />

context('calculate', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5634/js-calculator/index.html')
  })

  it('숫자를 입력 시 계산기에 표기가 된다.', () => {
    clickNumber('4')

    shouldDisplay('4')
  })

  it('두 숫자의 덧셈 시 결과가 일치한다.', () => {
    clickNumber('13')
    clickExpression('+')
    clickNumber('14')
    clickExpression('=')

    shouldDisplay('27')
  })

  it('두 숫자의 뺄셈 시 결과가 일치한다.', () => {
    clickNumber('15')
    clickExpression('-')
    clickNumber('13')
    clickExpression('=')

    shouldDisplay('2')
  })

  it('두 숫자의 곱셈 시 결과가 일치한다.', () => {
    clickNumber('2')
    clickExpression('X')
    clickNumber('8')
    clickExpression('=')

    shouldDisplay('16')
  })

  it('두 숫자의 나눗셈 시 결과가 일치한다.', () => {
    clickNumber('6')
    clickExpression('/')
    clickNumber('3')
    clickExpression('=')

    shouldDisplay('2')
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickNumber('5')
    shouldDisplay('5')

    cy.get('.modifiers').contains('AC').click()
    shouldDisplay('0')
  })

  it('3자리 이상만 입력시 경고창을 띄워주며 3자리만 표기된다.', () => {
    clickNumber('4444')
    alertMessage('숫자는 세 자리까지만 입력 가능합니다!')

    shouldDisplay('444')
  })

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickNumber('13')
    clickExpression('/')
    clickNumber('3')
    clickExpression('=')

    shouldDisplay('4')
  })

  it('0만 입력되어 있는 상태로 연산자를 클릭 시 경고창을 띄워준다.', () => {
    clickExpression('/')
    alertMessage('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
  })

  it('여러 숫자의 사칙연산의 결과가 일치한다.', () => {
    clickNumber('3')
    clickExpression('+')
    clickNumber('6')
    clickExpression('/')
    clickNumber('2')
    clickExpression('-')
    clickNumber('5')
    clickExpression('X')
    clickNumber('10')
    clickExpression('=')

    shouldDisplay('-44')
  })
})

function clickNumber(numbers) {
  numbers.split('').forEach((number) => {
    cy.get('.digit').contains(number).click()
  })
}

function clickExpression(expression) {
  cy.get('.operations').contains(expression).click()
}

function shouldDisplay(number) {
  cy.get('#total').should(($total) => {
    expect($total).to.contain(number)
  })
}

function alertMessage(message) {
  cy.on('window:alert', (txt) => {
    expect(txt).to.contains(message)
  })
}
