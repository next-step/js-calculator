import {MESSAGE, OPERATOR} from "../../src/js/constants/constants";
import {roundDown} from "../../src/js/calculator.js";

describe("calculator test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.clickDigits(6);
    cy.clickOperations(OPERATOR.PLUS);
    cy.clickDigits(2);
    cy.clickOperations(OPERATOR.EQUALS);
    cy.totalResult(8);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.clickDigits(6);
    cy.clickOperations(OPERATOR.MINUS);
    cy.clickDigits(2);
    cy.clickOperations(OPERATOR.EQUALS);
    cy.totalResult(4);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.clickDigits(3);
    cy.clickOperations(OPERATOR.MULTIPLICATION);
    cy.clickDigits(3);
    cy.clickOperations(OPERATOR.EQUALS);
    cy.totalResult(9);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.clickDigits(6);
    cy.clickOperations(OPERATOR.DIVISION);
    cy.clickDigits(2);
    cy.clickOperations(OPERATOR.EQUALS);
    cy.totalResult(3);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.clickDigits(2);
    cy.clickDigits(2);
    cy.clickModifier(OPERATOR.AC);
    cy.totalResult(0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.clickDigits(8);
    cy.clickDigits(4);
    cy.clickDigits(3);
    cy.alertMessage(MESSAGE.INVALID_NUMBER_SIZE);

    cy.totalResult(843);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.clickDigits(5);
    cy.clickOperations(OPERATOR.DIVISION);
    cy.clickDigits(2);
    cy.clickOperations(OPERATOR.EQUALS);
    cy.totalResult(roundDown(2));
  });
});
