describe("calculator test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.contain("6").click();
    cy.contain("+").click();
    cy.contain("2").click();
    cy.contain("=").click();
    cy.get("#total").should("have.text", "8");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.contain("4").click();
    cy.contain("-").click();
    cy.contain("2").click();
    cy.contain("=").click();
    cy.get("#total").should("have.text", "2");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.contain("3").click();
    cy.contain("*").click();
    cy.contain("2").click();
    cy.contain("=").click();
    cy.get("#total").should("have.text", "6");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.contain("6").click();
    cy.contain("/").click();
    cy.contain("2").click();
    cy.contain("=").click();
    cy.get("#total").should("have.text", "3");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.contain("2").click();
    cy.contain("2").click();
    cy.contain("AC").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const stub = cy.stub();

    cy.contain("8").click();
    cy.contain("4").click();
    cy.contain("3").click();
    cy.contain("3").then(() => {
      expect(stub.getCall(0)).to.be.calledWith(
        "숫자는 한번에 최대 3자리 수까지 입력 가능합니다!"
      );
    });
    cy.get("#total").should("have text", "843");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.contain("2").click();
    cy.contain("/").click();
    cy.contain("5").click();
    cy.contain("=").click();
    cy.get("#total").should("have.text", "2");
  });
});
