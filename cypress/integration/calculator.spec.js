// @ts-nocheck
import { Operators, ErrorMessages } from '../../src/js/constants.js'

before(() => {
  cy.visit('http://localhost:3000/')
})

describe('calculator', () => {
  const defaultTestSet = [
    [4, 2],
    [20, 10],
    [200, 100],
    [800, 200],
    [-200, 100],
  ]
  const defaultTester = (description, operator, func) => {
    describe(description, () => {
      defaultTestSet.forEach(([operand1, operand2]) => {
        it(`${operand1} ${operator} ${operand2} => ${func(operand1, operand2)}`, () => {
          cy.clickNumbers(operand1)
          cy.clickOperator(operator)
          cy.clickNumbers(operand2)
          cy.clickOperator(Operators.Equal)
          cy.resultShouldBe(func(operand1, operand2))
        })
      })
    })
  }

  beforeEach(cy.clickModifier)
  defaultTester('2개의 숫자에 대해 덧셈이 가능하다.', Operators.Add, (a, b) => a + b)
  defaultTester('2개의 숫자에 대해 뺄셈이 가능하다.', Operators.Subtract, (a, b) => a - b)
  defaultTester('2개의 숫자에 대해 곱셈이 가능하다.', Operators.Multiply, (a, b) => a * b)
  defaultTester('2개의 숫자에 대해 나눗셈이 가능하다.', Operators.Divide, (a, b) => Math.trunc(a / b))

  describe('음수인 두번째 피연산자의 부호 "-"는 "연산자 수정"으로 인식한다.', () => {
    it('10 / -20 = -10', () => {
      cy.clickNumbers(10)
      cy.clickOperator(Operators.Divide)
      cy.clickNumbers(-20)
      cy.clickOperator(Operators.Equal)
      cy.resultShouldBe(10 - 20)
    })
  })

  describe('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    ;[
      [10, 20],
      [50, 70],
      [500, 33],
    ].forEach(([operand1, operand2]) => {
      it(`${operand1} / ${operand2}`, () => {
        cy.clickNumbers(operand1)
        cy.clickOperator(Operators.Divide)
        cy.clickNumbers(operand2)
        cy.clickOperator(Operators.Equal)
        cy.resultShouldBe(Math.trunc(operand1 / operand2))
      })
    })
  })

  describe('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    ;[[10], [10, Operators.Add], [10, Operators.Multiply, 20]].forEach(([operand1, operator, operand2]) => {
      it(`${operand1} ${operator || ''} ${operand2 || ''}`, () => {
        cy.clickNumbers(operand1)
        if (operator) cy.clickOperator(operator)
        if (operand2) cy.clickNumbers(operand2)
        cy.clickModifier()
        cy.resultShouldBe(0)
      })
    })
  })

  describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    ;[
      [1000, Operators.Add, 200],
      [-500, Operators.Subtract, 1234],
      [-123, Operators.Multiply, 1000],
    ].forEach(([operand1, operator, operand2]) => {
      it(`${operand1} ${operator} ${operand2}`, () => {
        cy.clickNumbers(operand1)
        cy.clickOperator(operator)
        cy.clickNumbers(operand2)
        cy.clickOperator(Operators.Equal)
        cy.on('window:alert', text => expect(text).to.contains(ErrorMessages.MaxDigits))
      })
    })
  })

  describe('두번째 숫자 입력후 다시 연산자를 누르면 앞의 계산 결과에 이어서 연산을 진행한다.', () => {
    ;[
      [100, Operators.Add, 20, Operators.Subtract, '120-'],
      [-500, Operators.Subtract, 100, Operators.Add, '-600+'],
      [10, Operators.Multiply, 10, Operators.Subtract, '100-'],
    ].forEach(([operand1, operator1, operand2, operator2, result]) => {
      it(`${operand1} ${operator1} ${operand2} ${operator2} => ${result}`, () => {
        cy.clickNumbers(operand1)
        cy.clickOperator(operator1)
        cy.clickNumbers(operand2)
        cy.clickOperator(operator2)
        cy.resultShouldBe(result)
      })
    })
  })
})
