/// <reference types="cypress" />

import { times, random } from 'lodash'
import { parseNumericalExpression } from '../support/util.js'

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('#total').contains('0')
  })

  it('숫자를 누르면 h1#total에 들어간다.', () => {
    cy.get('.digit').click({ multiple: true })
    cy.get('#total').contains('09876543210')
  })

  it('초기값 숫자가 0인 경우 0을 계속 눌러도 0으로 표시한다.', () => {
    times(10, () => {
      cy.get('.digit:nth-child(10)').click()
    })

    cy.get('#total').contains('0')
  })

  it('초기값 숫자가 0인 경우 0이 아닌 숫자를 누르면 제일 앞에 0을 지우고 변경하기', () => {
    cy.get('.digit').then((ele) => {
      ele[random(0, 9)].click()
    })
    cy.get('#total').contains(/^[0-9]$/gim)
  })

  it('앞에 숫자가 하나 있고 /X-+연산자 버튼을 누르면 연산자가 표시 되게. =연산자 제외', () => {
    cy.get('.operation').then((ele) => {
      ele[random(0, 3)].click()
    })

    cy.get('#total').contains(/^-?[0-9]+[+/X-]$/gim)
  })

  it('= 연산자를 경우 표시하지 않는다', () => {
    times(4, () => {
      cy.get('.digit').then((ele) => {
        ele[random(0, 9)].click()
      })
    })

    cy.get('.operation').then((ele) => {
      ele[random(0, 3)].click()
    })

    times(4, () => {
      cy.get('.digit').then((ele) => {
        ele[random(0, 9)].click()
      })
    })

    cy.get('.operation:nth-child(5)').click()
    cy.get('#total').should('not.contain.text', '=')
  })

  // 기능 요구사항
  // - 2개의 숫자에 대해 덧셈이 가능
  it.only('2개의 숫자에 대해 덧셈이 가능.', () => {
    times(4, () => {
      cy.get('.digit').then((ele) => {
        ele[random(0, 9)].click()
      })
    })

    cy.get('.operation').contains('+').click()

    times(4, () => {
      cy.get('.digit').then((ele) => {
        ele[random(0, 9)].click()
      })
    })

    cy.get('#total').then((ele) => {
      const result = parseNumericalExpression(ele.text())
      cy.get('.operation:nth-child(5)').click()

      cy.get('#total')
        .invoke('text')
        .should((text) => expect(parseInt(text)).equal(result))
    })
  })
})
