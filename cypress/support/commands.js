// @ts-nocheck

Cypress.Commands.add('clickDigit', number => {
  cy.get(`button.digit[data-value="${number}"]`).click()
})
Cypress.Commands.add('clickOperator', operator => {
  cy.get(`button.operation[data-value="${operator}"]`).click()
})
Cypress.Commands.add('clickNumbers', number => {
  ;[...String(number)].forEach(num => {
    if (num === '-') cy.clickOperator(num)
    else cy.clickDigit(num)
  })
})

Cypress.Commands.add('clickModifier', () => {
  cy.get(`button.modifier`).click()
})
Cypress.Commands.add('resultShouldBe', value => {
  cy.get('#total').should('have.text', `${value}`)
})
