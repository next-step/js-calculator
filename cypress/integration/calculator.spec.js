// calculator.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
// 생성시 버튼과 초기값(10)을 렌더링 한다.
// + 버튼을 클릭 시 count가 1증가한다.
// - 버튼을 클릭 시 count가 1감소한다.
// + 버튼을 눌렀을 때 count가 12가 넘는 경우 더이상 증가하지 못한다. (Max 값이 12)
// - 버튼을 눌렀을 때 count는 8보다 작아지는 경우 감소하지 못한다. (Min 값이 8)
/// <reference types="cypress" />

describe('Calculator Test', () => {
 beforeEach(() => {
     cy.visit('http://localhost:5502')
 })

 describe('js calculator test case', () => {
    it('1+1 클릭시 결과값은 1이된다.', () => {
      cy.get('[data-cy= 1]').click(),
      cy.get('[data-cy= "+"]').click(),
      cy.get('[data-cy= 1]').click(),
      cy.get('[data-cy= "="]').click(),
      cy.get('[data-cy= "total"]').should('have.text', 2)
    })
    
    it('2-1 클릭시 결과값은 1이된다.', () => {
      cy.get('[data-cy=2]').click(),
      cy.get('[data-cy= "-"]').click(),
      cy.get('[data-cy=1]').click(),
      cy.get('[data-cy= "="]').click(),
      cy.get('[data-cy=total]').should('have.text', 1)
    })
    
    it('3*1 클릭시 결과값은 1이된다.', () => {
      cy.get('[data-cy=3]').click(),
      cy.get('[data-cy="*"]').click(),
      cy.get('[data-cy=1]').click(),
      cy.get('[data-cy= "="]').click(),
      cy.get('[data-cy=total]').should('have.text', 3)
    })
      
    it('4/2 클릭시 결과값은 2이된다.', () => {
      cy.get('[data-cy=4]').click(),
      cy.get('[data-cy= "/"]').click(),
      cy.get('[data-cy=2]').click(),
      cy.get('[data-cy= "="]').click(),
      cy.get('[data-cy=total]').should('have.text', 2)
    })

    it('AC클릭시 결과값은 0이된다.', () => {
      cy.get('[data-cy=modify]').click(),
      cy.get('[data-cy=total]').should('have.text', 0)
    })

    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
      cy.get('[data-cy=modify]').click(),
      cy.get('[data-cy=total]').should('have.text', 0)
    })

    
  })
})