Cypress.Commands.add("clickDigits", (digit) => {
  cy.get(".digit").contains(digit).click();
});

Cypress.Commands.add("clickOperations", (operation) => {
  cy.get(".operations").contains(operation).click();
});

Cypress.Commands.add("totalResult", (total) => {
  cy.get("#total").should("have.text", total);
});

Cypress.Commands.add("clickModifier", (modifier) => {
  cy.get(".modifiers").contains(modifier).click();
});

Cypress.Commands.add("alertMessage", (message) => {
  cy.on("window:alert", (text) => {
    expect(text).to.contain(message);
  });
});
