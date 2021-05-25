import calculator from "../../src/js/calculator.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });
  const left = 99;
  const right = 99;

  const clickNumber = (number) => {
    String(number).split("").forEach(clickDigit);
  };
  const clickDigit = (digit) => {
    cy.get(".digit").contains(digit).click();
  };
  const clickOperator = (op) => {
    cy.get(".operation").contains(op).click();
  };
  const processCal = (type, left, right) => {
    clickNumber(left);
    clickOperator(type);
    clickNumber(right);
    clickOperator("=");
    cy.get("#total").should("have.text", calculator(type, left, right));
  };

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const type = "+";
    processCal(type, left, right);
    cy.get("#total").should("have.text", calculator(type, left, right));
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const type = "-";
    processCal(type, left, right);
    cy.get("#total").should("have.text", calculator(type, left, right));
  });
  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const type = "X";
    processCal(type, left, right);
    cy.get("#total").should("have.text", calculator(type, left, right));
  });
  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const type = "/";
    processCal(type, left, right);
    cy.get("#total").should("have.text", calculator(type, left, right));
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    clickNumber(left);
    cy.get(".modifier").contains("AC").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
    clickNumber(9999);
    cy.get("@windowAlert").should(
      "be.calledWith",
      MESSAGE.INVALID_DIGIT_LENGTH
    );
  });
  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const type = "/";
    processCal(type, 100, 7);
    cy.get("#total").should("have.text", Math.floor(100 / 7));
  });
});
