describe("calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("숫자 버튼을 눌렀을 때 결과물이 보인다.", () => {
    cy.clickDigit("1");
    cy.clickDigit("2");
    cy.clickDigit("3");
    cy.clickDigit("4");
    cy.clickDigit("5");
    cy.clickDigit("6");
    cy.clickDigit("7");
    cy.clickDigit("8");
    cy.clickDigit("9");
  });
  it("연산 버튼을 눌렀을 때 결과물이 보인다.", () => {
    cy.clickOperation("+");
    cy.clickOperation("-");
    cy.clickOperation("X");
    cy.clickOperation("/");
  });
  it("AC눌렀을 때 결과물이 0으로 바뀐다.", () => {
    cy.clickDigit("9");
    cy.clickDigit("4");
    cy.clickDigit("9");
    cy.clickDigit("8");
    cy.clickDigit("1");
    cy.get(".modifier").click();
  });
  it("덧셈 기능이 작동된다.", () => {
    cy.clickDigit("5");
    cy.clickOperation("+");
    cy.clickDigit("2");
    cy.get("#equal").click();
    cy.get("#total").should("have.text", "7");
  });
  it("뺄셈 기능이 작동된다.", () => {
    cy.clickDigit("5");
    cy.clickOperation("-");
    cy.clickDigit("2");
    cy.get("#equal").click();
    cy.get("#total").should("have.text", "3");
  });
  it("곱셈 기능이 작동된다.", () => {
    cy.clickDigit("5");
    cy.clickOperation("X");
    cy.clickDigit("2");
    cy.get("#equal").click();
    cy.get("#total").should("have.text", "10");
  });
  it("나눗셈 기능이 작동된다.", () => {
    cy.clickDigit("9");
    cy.clickOperation("/");
    cy.clickDigit("3");
    cy.get("#equal").click();
    cy.get("#total").should("have.text", "3");
  });
  it("나눗셈 결과 소수점 이하는 버림", () => {
    cy.clickDigit("9");
    cy.clickOperation("/");
    cy.clickDigit("4");
    cy.get("#equal").click();
    cy.get("#total").should("have.text", "2");
  });
  it("세자리 이상으로 입력한다면 alert로 경고", () => {
    cy.clickDigit("9");
    cy.clickDigit("4");
    cy.clickDigit("2");
    cy.clickDigit("1");
    cy.get("#total").should("have.text", "942");
  });
});
