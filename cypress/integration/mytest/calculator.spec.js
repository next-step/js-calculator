describe("calculator test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const calculator = (first, operator, second) => {
    cy.get(".digits").contains(first).click();
    cy.get(".operations").contains(operator).click();
    cy.get(".digits").contains(second).click();
    cy.get(".operations").contains("=").click();
  };

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const first = 6;
    const operator = "+";
    const second = 2;
    calculator(first, operator, second);
    cy.get("#total").should("have.text", String(first + second));
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const first = 6;
    const operator = "-";
    const second = 2;
    calculator(first, operator, second);
    cy.get("#total").should("have.text", String(first - second));
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const first = 6;
    const operator = "X";
    const second = 2;
    calculator(first, operator, second);
    cy.get("#total").should("have.text", String(first * second));
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const first = 6;
    const operator = "/";
    const second = 2;
    calculator(first, operator, second);
    cy.get("#total").should("have.text", String(Math.floor(first / second)));
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get(".digits").contains(5).click();
    cy.get(".modifier").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get(".digits").contains(5).click();
    cy.get(".digits").contains(3).click();
    cy.get(".digits").contains(2).click();
    cy.get(".digits").contains(1).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("숫자는 세 자리까지만 입력 가능합니다!");
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const first = 3;
    const operator = "/";
    const second = 2;
    calculator(first, operator, second);
    cy.get("#total").should("have.text", String(Math.floor(first / second)));
  });
});
