describe('test calculator', () => {
    const clickDigit = (num) => {
        cy.get('.digit').contains(num.toString()).click();
    };

    const clickOperator = (operator) => {
        cy.get('.operation').contains(operator).click();
    };

    before(() => {
        cy.visit('../../index.html');
    });

    it('click four digits', () => {
        clickDigit(1);
        clickDigit(2);
        clickDigit(3);
        clickDigit(4);
        cy.get('#total').should('have.text', '123');
    });

    it('test + operation', () => {
        clickOperator('+');
        clickDigit(5);
        clickOperator('=');
        cy.get('#total').should('have.text', '128');
    });

    it('test - operation', () => {
        clickOperator('-');
        clickDigit(6);
        clickOperator('=');
        cy.get('#total').should('have.text', '122');
    });

    it('test * operation', () => {
        clickOperator('X');
        clickDigit(7);
        clickOperator('=');
        cy.get('#total').should('have.text', '854');
    });

    it('test / operation', () => {
        clickOperator('/');
        clickDigit(7);
        clickOperator('=');
        cy.get('#total').should('have.text', '122');
    });

    it('test decimal point', () => {
        clickOperator('/');
        clickDigit(3);
        clickOperator('=');;
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
});
