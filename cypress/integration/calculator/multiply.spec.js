describe('multiply', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        cy.get('.digit + [value="6"]')
          .click();
        cy.get('[data-cy="multiply"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();

        cy.get('#total')
          .should('have.text', '18');
    });
});
