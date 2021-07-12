describe('Add Operation Test', () => {
	beforeEach(() => {
		cy.visit('')
	})

	it('1-1', () => {
		cy.get('#total').should('have.text', '0')

		cy.get('.digit').contains('1').click()

		cy.get('#total').should('have.text', '1')

		cy.get('.operation').contains('+').click()

		cy.get('#total').should('have.text', '1+')

		cy.get('.digit').contains('2').click()

		cy.get('#total').should('have.text', '1+2')

		cy.get('.operation').contains('=').click()

		cy.get('#total').should('have.text', '3')
	})
})
