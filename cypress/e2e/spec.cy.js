const clickDigits = (numbers) => {
  [...numbers].forEach((number) => {
    clickDigit(number);
  });
};

const clickDigit = (number) => {
  cy.get(".digit").contains(number).click();
};

const clickOperator = (operator) => {
  cy.get(".operation").contains(operator).click();
};

const getAnswer = (number) => {
  cy.get(".total");
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

    cy.get("#total").contains("171");
  });
});
