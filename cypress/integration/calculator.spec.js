/// <reference types="cypress"/>

context("Calculator", () => {
  const $digitBtnDict = {};
  beforeEach(() => {
    cy.visit(`http://localhost:5500`);
    cy.get(".digits")
      .children()
      .each(($digit) => {
        $digitBtnDict[$digit.text()] = $digit;
      });
    cy.get(".operations")
      .children()
      .each(($digit) => {
        $digitBtnDict[$digit.text()] = $digit;
      });
    cy.get(".modifiers")
      .children()
      .each(($digit) => {
        $digitBtnDict[$digit.text()] = $digit;
      });
  });

  it("should add 2 numbers", () => {
    $digitBtnDict["9"].click();
    $digitBtnDict["+"].click();
    $digitBtnDict["8"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "17");
  });

  it("should subtract 2 numbers", () => {
    $digitBtnDict["9"].click();
    $digitBtnDict["-"].click();
    $digitBtnDict["8"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "1");
  });

  it("should multiply 2 numbers", () => {
    $digitBtnDict["9"].click();
    $digitBtnDict["X"].click();
    $digitBtnDict["8"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "72");
  });

  it("should divide 2 numbers", () => {
    $digitBtnDict["9"].click();
    $digitBtnDict["/"].click();
    $digitBtnDict["3"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "3");
  });

  it("should set total to 0 if AC is clicked", async () => {
    $digitBtnDict["1"].click();
    $digitBtnDict["+"].click();
    $digitBtnDict["1"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "2");
    await cy.wait(1000);
    $digitBtnDict["AC"].click();
    cy.get("#total").should("have.text", "0");
  });

  it("should not input if digits over 3", () => {
    $digitBtnDict["1"].click();
    $digitBtnDict["1"].click();
    $digitBtnDict["1"].click();
    $digitBtnDict["1"].click();
    cy.get("#total").should("have.text", "111");
  });

  it("should round down total", () => {
    $digitBtnDict["8"].click();
    $digitBtnDict["/"].click();
    $digitBtnDict["3"].click();
    $digitBtnDict["="].click();
    cy.get("#total").should("have.text", "2");
  });
});
