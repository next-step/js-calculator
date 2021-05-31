describe('js-calculator', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('.operation + [value="+"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('.operation + [value="="]')
          .click();

        cy.get('#total')
          .should('have.text', '10');
    });
});
