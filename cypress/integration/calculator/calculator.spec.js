const clickDigit = (number) => {
  return cy.get(".digit").contains(number).click();
};

const clickOperation = (operation) => {
  return cy.get(".operation").contains(operation).click();
};

const totalHaveText = (text) => {
  cy.get("#total").should("have.text", text);
};

describe("calculator-test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    clickDigit("1");
    clickDigit("0");
    clickOperation("+");
    clickDigit("5");
    clickOperation("=");
    totalHaveText(15);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    clickDigit("1");
    clickOperation("-");
    clickDigit("2");
    clickDigit("7");
    clickOperation("=");
    totalHaveText(-26);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    clickDigit("1");
    clickDigit("0");
    clickOperation("X");
    clickDigit("2");
    clickDigit("7");
    clickOperation("=");
    totalHaveText(270);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    clickDigit("2");
    clickDigit("7");
    clickDigit("0");
    clickOperation("/");
    clickDigit("2");
    clickDigit("7");
    clickOperation("=");
    totalHaveText(10);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    clickDigit("2");
    clickDigit("7");
    clickDigit("0");
    cy.get(".modifier").contains("AC").click();
    totalHaveText(0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    clickDigit("2");
    clickDigit("7");
    clickDigit("0");
    clickDigit("1");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("숫자는 세 자리까지만 입력 가능합니다!");
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    clickDigit("2");
    clickDigit("7");
    clickDigit("3");
    clickOperation("/");
    clickDigit("2");
    clickDigit("7");
    clickOperation("=");
    totalHaveText(10);
  });
});
