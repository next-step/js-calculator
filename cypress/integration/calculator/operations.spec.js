describe('사칙 연산', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="seven"]')
          .click();
        cy.get('[data-test="operator-plus"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-test="operator-equal"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '10');
    });
});
