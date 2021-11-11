Cypress.Commands.add("clickDigit", (number) => {
    number.forEach((number) => {
        cy.get(`button[data-value="${number}"]`).click();
    });
});

Cypress.Commands.add("clickOperation", (operator) => {
    cy.get(`button.operation[data-value="${operator}"]`).click();
});

Cypress.Commands.add("clickModifier", () => {
    cy.get(`button.modifier`).click();
});

Cypress.Commands.add("shouldBe", (value) => {
    cy.get("#total").should("have.text", `${value}`);
});
