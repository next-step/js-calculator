describe("계산기 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("UI 테스트", () => {
    it("0-9까지의 총 10개의 숫자 버튼이 존재한다.", () => {
      cy.get("[data-cy^=digit]").should("have.length", 10);
    });
    it("사칙연산에 필요한 버튼(+,-,/,X,=)이 존재한다.", () => {
      cy.get("[data-cy^=operator]").should("have.length", 5);
    });
    it("AC 버튼이 존재한다.", () => {
      cy.get("[data-cy=modifier]").should("have.length", 1);
    });
    it("결과값을 확인할 수 있는 UI 존재한다.", () => {
      cy.get('[data-cy="total"]').should("have.length", 1);
    });
  });

  describe("사칙연산 테스트", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      cy.calculate({ prev: "2", next: "7", operator: "sum" });
      cy.expectResult("9");
    });

    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
      cy.calculate({ prev: "10", next: "7", operator: "subtract" });
      cy.expectResult("3");
    });

    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
      cy.calculate({ prev: "10", next: "7", operator: "multiple" });
      cy.expectResult("70");
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      cy.calculate({ prev: "10", next: "2", operator: "divide" });
      cy.expectResult("5");
    });
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.clickDigit("10");
    cy.get("[data-cy=modifier]").click();
    cy.expectResult("0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.clickDigit("1000");
    cy.expectResult("100");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.calculate({ prev: "25", next: "23", operator: "divide" });
    cy.expectResult("1");
  });
});
