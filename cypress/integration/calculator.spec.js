describe('test calculator', () => {
    before(() => {
        cy.visit('../../index.html');
    });

    it('click four digits', () => {
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('3').click();
        cy.get('.digit').contains('4').click();
        cy.get('#total').should('have.text', '123');
    });

    it('test + operation', () => {
        cy.get('.operation').contains('+').click();
        cy.get('.digit').contains('5').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '128');
    });

    it('test - operation', () => {
        cy.get('.operation').contains('-').click();
        cy.get('.digit').contains('6').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '122');
    });

    it('test * operation', () => {
        cy.get('.operation').contains('X').click();
        cy.get('.digit').contains('7').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '854');
    });

    it('test / operation', () => {
        cy.get('.operation').contains('/').click();
        cy.get('.digit').contains('7').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '122');
    });

    it('test decimal point', () => {
        cy.get('.operation').contains('/').click();
        cy.get('.digit').contains('3').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '40');
    });

    it('click AC', () => {
        cy.get('.modifiers').click();
        cy.get('#total').should('have.text', '0');
    });

    it('click AC after clicking digits', () => {
        cy.get('.digit').contains('9').click();
        cy.get('.digit').contains('9').click();
        cy.get('.modifiers').click();
        cy.get('#total').should('have.text', '0');
    });

    // it('remove decimal point', () => {});
});
