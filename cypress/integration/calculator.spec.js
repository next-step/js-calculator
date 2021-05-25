/// <reference types="cypress" />
context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const [test, expectedResult] = ["209+102=", 311];
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", expectedResult);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const [test, expectedResult] = ["209-102=", 209 - 102];
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", expectedResult);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const [test, expectedResult] = ["5X72=", 5 * 72];
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", expectedResult);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const [test, expectedResult] = ["77/11=", 77 / 11];
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", expectedResult);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    const test = "628";
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", 628);
    cy.contains("button", "AC").click();
    cy.get("#total").should("have.text", 0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    const test = "582";
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.contains("button", "1")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "숫자는 세 자리까지만 입력 가능합니다!"
        );
      });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const [test, expectedResult] = ["209/102=", parseInt(209 / 102)];
    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.get("#total").should("have.text", expectedResult);
  });
});
