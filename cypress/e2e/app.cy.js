// <reference types="cypress" />

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders", () => {
    cy.get(".digit").should("have.length", 10);
  });
});
