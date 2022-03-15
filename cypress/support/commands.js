// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkTotal', (number) => {
	cy.get('#total').should('have.text', number);
});

Cypress.Commands.add('inputDigits', (number) => {
	number
		.toString()
		.split('')
		.forEach((digit) => {
			cy.get('.digit').contains(digit).click();
		});
});

Cypress.Commands.add('clickOperator', (operator) => {
	cy.get('.operator').contains(operator).click();
});

Cypress.Commands.add('clickModifier', (modifier) => {
	cy.get('.modifier').contains(modifier).click();
});
