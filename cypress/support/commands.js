// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { times, random } from 'lodash'
import { parseNumericalExpression, parseNumber } from './util.js'

const OPERATORS = ['+', '-', 'X', '/', '=']
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

Cypress.Commands.add('inputNumber', (targetNumber) => {
  targetNumber !== undefined ? cy.get('.digit').contains(targetNumber).click() : cy.get('.digit').contains(random(0, 9)).click()
})

Cypress.Commands.add('inputRepeatNumber', (maxDigit = random(1, 4), targetNumber) => {
  times(maxDigit, () => {
    cy.inputNumber(targetNumber)
  })
})

Cypress.Commands.add('inputRandomNumericalExpression', (operator, maxDigit) => {
  cy.inputRepeatNumber(maxDigit)

  operator !== undefined ? cy.get('.operation').contains(operator).click() : cy.get('.operation').contains(OPERATORS[random(0, 4)]).click()

  cy.inputRepeatNumber(maxDigit)
})

Cypress.Commands.add('inputIgnoreTargetNumber', (ignoreNumber) => {
  const randomNum = NUMBERS.filter((number) => number !== ignoreNumber)[random(0, 8)]
  cy.get('.digit').contains(randomNum).click()
})

Cypress.Commands.add('inputOperator', (targetOperator) => {
  targetOperator !== undefined ? cy.get('.operation').contains(targetOperator).click() : cy.get('.operation').contains(OPERATORS[random(0, 4)]).click()
})

Cypress.Commands.add('inputIgnoreTargetOperator', (ignoreOperator) => {
  const randOperator = OPERATORS.filter((operator) => operator !== ignoreOperator)[random(0, 3)]
  cy.get('.operation').contains(randOperator).click()
})

Cypress.Commands.add('calculateNumericalExpression', () => {
  cy.get('#total')
    .invoke('text')
    .then((text) => {
      const result = parseNumericalExpression(text)
      cy.inputOperator('=')

      cy.get('#total')
        .invoke('text')
        .should((text) => expect(parseNumber(text)).equal(result))
    })
})
