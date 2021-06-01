describe('all clear (AC)', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('[data-cy="minus"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();
        cy.get('.modifier')
          .click();

        cy.get('#total')
          .should('have.text', '0');
    });

    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다. - 연산 입력 도중 클릭해도 초기화', () => {
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('[data-cy="minus"]')
          .click();
        cy.get('.modifier')
          .click();

        cy.get('#total')
          .should('have.text', '0');

        //초기화 이후 정상동작
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('[data-cy="plus"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();

        cy.get('#total')
          .should('have.text', '10');
    });
});
