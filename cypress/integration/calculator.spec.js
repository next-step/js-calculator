import { MESSAGES, NUM } from "../../src/js/constant.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const calculatorClick = (s) => {
    if (!isNaN(+s)) return cy.get(".digits").contains(s).click();
    cy.get(".operations").contains(s).click();
  };

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const [test, result] = ["200+100=", 200 + 100];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const [test, result] = ["200-100=", 200 - 100];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const [test, result] = ["200X100=", 200 * 100];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const [test, result] = ["200/100=", 200 / 100];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });

  it("n개의 숫자에 대해 계산이 가능하다.", () => {
    const [test, result] = ["200+100-50X2/5+123-456=", ((200 + 100 - 50) * 2) / 5 + 123 - 456];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    const test = "200+100=";
    [...test].forEach(calculatorClick);
    cy.get(".modifiers").click();
    cy.get("#total").should("have.text", NUM.DEFAULT);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const test = "1234";
    cy.window().then((w) => cy.stub(w, "alert").as("wAlert"));
    [...test].forEach(calculatorClick);
    cy.get("@wAlert").should("be.calledWith", MESSAGES.INVALID_LENGTH);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const [test, result] = ["456/123=", Math.floor(456 / 123)];
    [...test].forEach(calculatorClick);
    cy.get("#total").should("have.text", result);
  });
});
