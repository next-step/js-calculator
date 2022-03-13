describe("계산기 테스트", () => {
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="plus"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "17");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="minus"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "1");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="multiplication"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "72");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="division"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "1");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get("#clear").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get("#total").should("have.text", "999");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="division"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "1");
  });
});
