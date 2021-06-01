describe('enter digit', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
        cy.get('.digit + [value="1"]')
          .click();
        cy.get('.digit + [value="2"]')
          .click();
        cy.get('.digit + [value="3"]')
          .click();
        cy.get('.digit + [value="4"]')
          .click();

        cy.on('window:alert', (txt) => {
            expect(txt)
                .to
                .contains('3자리 숫자까지만 입력 가능합니다.');
        });
    });
});
