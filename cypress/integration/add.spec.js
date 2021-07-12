describe('Add Operation Test', () => {
	beforeEach(() => {
		cy.visit('')
	})

	it('숫자 0이 표시되어 있는 상태', () => {
		cy.get('#total').should('have.text', '0')
	})

	it('숫자 1을 클릭', () => {
		cy.get('.digit').contains('1').click()

		cy.get('#total').should('have.text', '1')
	})

	it('+ 버튼을 클릭', () => {
		cy.get('.operation').contains('+').click()

		cy.get('#total').should('have.text', '1+')
	})

	it('숫자 2를 클릭', () => {
		cy.get('.digit').contains('2').click()

		cy.get('#total').should('have.text', '1+2')
	})

	it('= 버튼을 클릭', () => {
		cy.get('.operation').contains('=').click()

		cy.get('#total').should('have.text', '3')
	})
})
