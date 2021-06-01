describe('divide', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        cy.get('.digit + [value="6"]')
          .click();
        cy.get('[data-cy="divide"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();

        cy.get('#total')
          .should('have.text', '2');
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다. - 소수점 이하는 버림한다.', () => {
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('[data-cy="divide"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();

        cy.get('#total')
          .should('have.text', '2');
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다. - 0으로 나누려는 경우 alert 가 표시된다.', () => {
        cy.get('.digit + [value="7"]')
          .click();
        cy.get('[data-cy="divide"]')
          .click();
        cy.get('.digit + [value="0"]')
          .click();
        cy.get('[data-cy="calculate"]')
          .click();

        cy.on('window:alert', (txt) => {
            expect(txt)
                .to
                .contains('0으로 나눌 수 없습니다.');
        });
    });
});
