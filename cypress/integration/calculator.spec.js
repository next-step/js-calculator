import { calculate } from "../_testUtils/utils.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  describe("숫자 버튼", () => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
      it(`${number} 클릭 시 상단의 번호 바뀜`, () => {
        cy.get(".digit").contains(number).click();

        cy.get("#total").should("have.text", number);
      });
    });

    it("두 번 연속 클릭 시 뒤에 추가됨", () => {
      const before = "1";
      const after = "2";

      cy.get(".digit").contains(before).click();
      cy.get(".digit").contains(after).click();

      cy.get("#total").should("have.text", before + after);
    });
  });

  describe("AC 버튼", () => {
    it("클릭 시 0으로 복귀", () => {
      cy.get(".digit").contains(1).click();

      cy.get(".modifier").click();

      cy.get("#total").should("have.text", 0);
    });
  });

  describe("연산자 버튼", () => {
    ["+", "-", "X", "/", "="].forEach((operator) => {
      it(`숫자 클릭 후 ${operator} 클릭 시 다음 숫자는 추가되지 않고 덮어씌움`, () => {
        cy.get(".digit").contains(1).click();

        cy.get(".operation").contains(operator).click();
        cy.get(".digit").contains(3).click();

        cy.get("#total").should("have.text", 3);
      });
    });

    it("클릭 후 두번째 숫자는 덮어씌워지지 않고 추가", () => {
      cy.get(".digit").contains(1).click();
      cy.get(".operation").contains("+").click();
      cy.get(".digit").contains(3).click();

      cy.get(".digit").contains(4).click();

      cy.get("#total").should("have.text", 34);
    });
  });

  describe("연산", () => {
    it("더하기 연산", () => {
      const num1 = 1;
      const num2 = 3;
      const operator = "+";

      calculate({ num1, num2, operator });

      cy.get("#total").should("have.text", num1 + num2);
    });

    it("빼기 연산", () => {
      const num1 = 3;
      const num2 = 1;
      const operator = "-";

      calculate({ num1, num2, operator });

      cy.get("#total").should("have.text", num1 - num2);
    });

    it("곱하기 연산", () => {
      const num1 = 4;
      const num2 = 9;
      const operator = "X";

      calculate({ num1, num2, operator });

      cy.get("#total").should("have.text", num1 * num2);
    });

    it("나누기 연산", () => {
      const num1 = 10;
      const num2 = 2;
      const operator = "/";

      calculate({ num1, num2, operator });

      cy.get("#total").should("have.text", num1 / num2);
    });
  });
});
