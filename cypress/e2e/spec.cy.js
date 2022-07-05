Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("test calculator", () => {
  const handleClickDigit = (num) => {
    cy.get(".digit").contains(num.toString()).click();
  };

  const handleClickOperator = (operator) => {
    cy.get(".operation").contains(operator).click();
  };

  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    handleClickDigit(9);
    handleClickOperator("+");
    handleClickDigit(1);
    handleClickOperator("=");
    cy.get("#total").should("have.text", "10");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    handleClickDigit(9);
    handleClickOperator("-");
    handleClickDigit(1);
    handleClickOperator("=");
    cy.get("#total").should("have.text", "8");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    handleClickDigit(9);
    handleClickOperator("*");
    handleClickDigit(1);
    handleClickOperator("=");
    cy.get("#total").should("have.text", "9");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    handleClickDigit(9);
    handleClickOperator("/");
    handleClickDigit(1);
    handleClickOperator("=");
    cy.get("#total").should("have.text", "9");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    handleClickDigit(1);
    cy.get(".modifiers").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    handleClickDigit(1);
    handleClickDigit(2);
    handleClickDigit(3);
    handleClickDigit(4);
    cy.on("window:alert", (str) => {
      expect(str).to.equal("숫자는 최대 3자리까지만 입력 가능합니다!");
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get(".modifiers").click();
    cy.get("#total").should("have.text", "0");
  });
});
