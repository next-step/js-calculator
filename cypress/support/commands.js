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

Cypress.Commands.add('alert', alertText => {
  cy.on('window:alert', text => {
    expect(text).to.contains(alertText);
  });
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) =>
  //   const domain = Cypress.env('../../index.html');

  //   if (domain === '...') {
  //     url = '...';
  //   }

  //   if (options.something === 'else') {
  //     url = '...';
  //   }

  // originalFn is the existing `visit` command that you need to call
  // and it will receive whatever you pass in here.
  //
  // make sure to add a return here!
  originalFn('../../index.html', options)
);

/**
 * Cypress.Commands.add('checkToken', (token) => {
  cy.window().its('localStorage.token').should('eq', token)
})
 */
