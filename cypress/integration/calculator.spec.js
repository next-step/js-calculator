import { ERROR_MESSAGES } from "../../src/js/constants.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("계산 테스트", () => {
    it(" 2개의 숫자에 대해 덧셈이 가능하다", () => {
      const [test, result] = ["234+567=", 234 + 567];

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.get("#total").should("have.text", result);
    });

    it(" 2개의 숫자에 대해 뺄셈이 가능하다", () => {
      const [test, result] = ["234-567=", 234 - 567];

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.get("#total").should("have.text", result);
    });

    it(" 2개의 숫자에 대해 곱셈이 가능하다", () => {
      const [test, result] = ["34X56=", 34 * 56];

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.get("#total").should("have.text", result);
    });

    it(" 2개의 숫자에 대해 나눗셈이 가능하다", () => {
      const [test, result] = ["100/4=", 100 / 4];

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.get("#total").should("have.text", result);
    });

    it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
      const test = "345";
      const defaultValue = 0;

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.contains("button", "AC").click();

      cy.get("#total").should("have.text", defaultValue);
    });

    it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
      const test = "345";
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      //첫번째 방법
      cy.contains("button", "6")
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGES.DIGIT_LIMIT);
        });

      // 두번째 방법
      // cy.contains("button", "6")
      //   .click()
      //   .then(() => {
      //     cy.on("window:alert", (message) => {
      //       expect(message).to.equal(ERROR_MESSAGES.DIGIT_LIMIT);
      //     });
      //   });
    });

    it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
      const [test, result] = ["100/7=", parseInt(100 / 7)];

      [...test].forEach((s) => {
        cy.contains("button", s).click();
      });

      cy.get("#total").should("have.text", result);
    });
  });
});
