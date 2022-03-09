/// <reference types="cypress" />
describe("계산기 테스트", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/');
    });

    it('계산기가 보인다', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('.calculator').should('exist')
    })
});
