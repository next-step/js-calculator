describe('My first test', () => {
    it('click test', () =>{
        cy.visit('/index.html')
        cy.get('.modifier').click();
    });

    it('click number 1', () => {
        cy.get('.digit').contains('1').click();
    });
});
