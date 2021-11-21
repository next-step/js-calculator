//custom command
Cypress.Commands.add("clickNumberButton", (number) => {
  [...String(number)].forEach((ele) =>
    cy.get(`button[data-digit="${Number(ele)}"]`).click()
  );
});

Cypress.Commands.add("clickOperationButton", (operation) => {
  cy.get(`button[data-operation="${operation}"]`).click();
});

Cypress.Commands.add("clickModifierButton", (modifier) => {
  cy.get(`button[data-modifier="${modifier}"]`).click();
});

Cypress.Commands.add("resultShouldBe", (value) => {
  cy.get("#total").should("have.text", `${value}`);
});
