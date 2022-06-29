describe('calculator render test', () => {
	it('calculator is rendered on index.html', () => {
		cy.visit('/index.html');
		cy.get('[class="calculator"]');
	});
});
