import { OPERATIONS, MESSAGES } from "../../src/js/constants";

describe("Calculator Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const clickNumber = length => {
    const numbersArr = [];
    for (let i = 0; i < length; i++) {
      const randomDigit0_9 = Math.floor(Math.random() * 10);
      numbersArr.push(randomDigit0_9);
      cy.get(".digits").contains(randomDigit0_9).click();
    }

    const resultNumber = Number(numbersArr.join(""));
    return resultNumber;
  };

  const clickOperation = operation => {
    cy.get(".operations").contains(operation).click();
  };

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const num1 = clickNumber(2);
    clickOperation(OPERATIONS.ADD);
    const num2 = clickNumber(3);
    clickOperation(OPERATIONS.CALCULATE);
    cy.get("#total").should("have.text", num1 + num2);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const num1 = clickNumber(3);
    clickOperation(OPERATIONS.SUBSTRACT);
    const num2 = clickNumber(2);
    clickOperation(OPERATIONS.CALCULATE);
    cy.get("#total").should("have.text", num1 - num2);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const num1 = clickNumber(3);
    clickOperation(OPERATIONS.MULTIPLY);
    const num2 = clickNumber(2);
    clickOperation(OPERATIONS.CALCULATE);
    cy.get("#total").should("have.text", num1 * num2);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const num1 = clickNumber(3);
    clickOperation(OPERATIONS.DIVIDE);
    const num2 = clickNumber(2);
    clickOperation(OPERATIONS.CALCULATE);
    cy.get("#total").should("have.text", Math.floor(num1 / num2));
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    clickNumber(3);
    cy.get(".modifiers").contains("AC").click();
    cy.get("#total").should("have.text", 0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const EXPECTED_ALERT_MESSAGE = MESSAGES.MAX_LENGTH;
    clickNumber(3);
    cy.get(".digits").contains(9).click();
    cy.on("window:alert", txt => {
      expect(txt).to.equal(EXPECTED_ALERT_MESSAGE);
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    clickNumber(3);
    clickOperation(OPERATIONS.DIVIDE);
    cy.get(".digits").contains("7").click();
    clickOperation(OPERATIONS.CALCULATE);
    cy.get("#total").should("not.have.text", ".");
  });
});
