describe("calculator-test", () => {
  beforeEach(() => {
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
    cy.visit("http://127.0.0.1:5500/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("0").click();
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains("5").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", 15);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".operation").contains("-").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", -26);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("0").click();
    cy.get(".operation").contains("X").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", 270);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".digit").contains("0").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", 10);
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".digit").contains("0").click();
    cy.get(".modifier").contains("AC").click();
    cy.get("#total").should("have.text", 0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".digit").contains("0").click();
    cy.get(".digit").contains("1").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("숫자는 세 자리까지만 입력 가능합니다!");
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("7").click();
    cy.get(".operation").contains("=").click();
    cy.get("#total").should("have.text", 10);
  });
});
