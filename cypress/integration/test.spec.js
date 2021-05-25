describe("My Calc Test", () => {
  beforeEach(() => {
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
    cy.visit("http://localhost:8080/");
  });

  it("Number Input Test 0", () => {
    // 초기에 0을 클릭해도 변화 없음
    cy.get(".digit0").click();
    cy.get(".digit0").click();
    cy.get("#total").should("have.text", "0");
  });

  it("Number Input Test987", () => {
    cy.get(".digit9").click();
    cy.get(".digit8").click();
    cy.get(".digit7").click();
    cy.get("#total").should("have.text", "987");
  });

  it("Number Input Test654", () => {
    cy.get(".digit6").click();
    cy.get(".digit5").click();
    cy.get(".digit4").click();
    cy.get("#total").should("have.text", "654");
  });

  it("Number Input Test321", () => {
    cy.get(".digit3").click();
    cy.get(".digit2").click();
    cy.get(".digit1").click();
    cy.get("#total").should("have.text", "321");
  });

  it("Number Input Test100", () => {
    cy.get(".digit1").click();
    cy.get(".digit0").click();
    cy.get(".digit0").click();
    cy.get("#total").should("have.text", "100");
  });

  it("숫자 3자리 입력테스트", () => {
    // 9를 4번 입력
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();

    cy.get("#total").should("have.text", "999");
  });

  it("연산자 뒤에 숫자 3자리 입력테스트", () => {
    // 9를 4번 입력
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".plus").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();
    cy.get(".digit9").click();

    cy.get("#total").should("have.text", "999+999");
  });

  it("+Operator Test", () => {
    cy.get(".digit2").click();
    cy.get(".digit1").click();
    cy.get(".plus").click();
    cy.get(".digit7").click();
    cy.get(".equal").click();
    cy.get("#total").should("have.text", "28");
  });
  it("-Operator Test", () => {
    cy.get(".digit2").click();
    cy.get(".digit1").click();
    cy.get(".minus").click();
    cy.get(".digit7").click();
    cy.get(".equal").click();
    cy.get("#total").should("have.text", "14");
  });
  it("*Operator Test", () => {
    cy.get(".digit2").click();
    cy.get(".digit1").click();
    cy.get(".multiple").click();
    cy.get(".digit7").click();
    cy.get(".equal").click();
    cy.get("#total").should("have.text", "147");
  });
  it("/Operator Test", () => {
    cy.get(".digit2").click();
    cy.get(".digit1").click();
    cy.get(".divide").click();
    cy.get(".digit7").click();
    cy.get(".equal").click();
    cy.get("#total").should("have.text", "3");
  });
  it("modifier Test", () => {
    cy.get(".digit2").click();
    cy.get(".digit1").click();

    cy.get(".modifier").click();
    cy.get("#total").should("have.text", "0");
  });
});
