describe("Knowledge Base Application", () => {
  it("Shows a placeholder", () => {
    cy.visit("/");
    cy.get("h1").should("have.text", "Hello");
    cy.get("h1").should("have.text", "Hello2");
  });
});
