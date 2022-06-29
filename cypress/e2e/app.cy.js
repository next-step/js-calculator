// <reference types="cypress" />

const defaultValue = "0";

describe("calculator", () => {
  const clickDigit = (number) => cy.get(".digit").contains(number).click();
  const clickAC = () => cy.get(".modifier").contains("AC").click();
  const clickOperation = (operation) =>
    cy.get(".operation").contains(operation).click();
  const clickEual = () => cy.get("#equal-sign").click();
  const getTotal = () => cy.get("#total");

  beforeEach(() => {
    cy.visit("/");
  });

  it("total은 defaultValue(0)으로 렌더", () => {
    getTotal().should("have.text", defaultValue);
  });

  describe("입력", () => {
    describe("숫자", () => {
      it("0은 클릭하더라도 default value에서 변화 없음", () => {
        clickDigit("0");
        clickDigit("0");

        getTotal().should("have.text", defaultValue);
      });

      it("1 - 9, 1회 입력하면 해당 숫자가 total에 렌더", () => {
        for (let i = 1; i < 10; i++) {
          clickDigit(i.toString());
          getTotal().should("have.text", i.toString());
          clickAC();
        }
      });

      it("3자리 숫자 입력하면 total에 렌더", () => {
        clickDigit("9");
        clickDigit("0");
        clickDigit("5");
        getTotal().should("have.text", "905");
      });

      it("숫자는 4자리 숫자를 입력하면 입력되지 않고 alert 실행", () => {
        clickDigit("1");
        clickDigit("4");
        clickDigit("0");
        clickDigit("0");

        getTotal().should("have.text", "140");
        cy.on("window:alert", (t) => {
          //assertions
          expect(t).to.contains("숫자는 세 자리까지만 입력 가능합니다!");
        });
      });
    });
  });

  describe("연산", () => {});
});
