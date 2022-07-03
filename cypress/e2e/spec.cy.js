const clickDigits = (digits) => {
  [...digits].forEach((digit) => {
    clickDigit(digit);
  });
};

const clickDigit = (number) => {
  cy.get(".digit").contains(number).click();
};

const clickOperator = (operator) => {
  cy.get(".operation").contains(operator).click();
};

const getAnswer = (number) => {
  cy.get("#total").contains(number);
};

describe("계산기 요구사항 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다", () => {
    clickDigits("90");
    clickOperator("+");
    clickDigits("81");
    clickOperator("=");

    getAnswer("171");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다", () => {
    clickDigits("901");
    clickOperator("-");
    clickDigits("101");
    clickOperator("=");

    getAnswer("800");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다", () => {
    clickDigits("40");
    clickOperator("X");
    clickDigits("32");
    clickOperator("=");

    getAnswer("1280");
  });
});
