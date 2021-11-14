// - [ ] 2개의 숫자에 대해 덧셈이 가능하다.
// - [ ] 2개의 숫자에 대해 뺄셈이 가능하다.
// - [ ] 2개의 숫자에 대해 곱셈이 가능하다.
// - [ ] 2개의 숫자에 대해 나눗셈이 가능하다.
// - [ ] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// - [ ] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// - [ ] 계산 결과를 표현할 때 소수점 이하는 버림한다.
// - [ ] 0으로 나눌 수 없다.

const BASE_URL = "http://127.0.0.1:5500";

beforeEach(() => {
  cy.visit(BASE_URL);
});

describe("계산 기능", () => {
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.get('[data-digit="9"]').click();
    cy.get('[data-oper="+"]').click();
    cy.get('[data-digit="9"]').click();
    cy.get('[data-oper="="]').click();

    cy.get("#total").should("have.text", "18");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.get('[data-digit="8"]').click();
    cy.get('[data-oper="-"]').click();
    cy.get('[data-digit="1"]').click();
    cy.get('[data-oper="="]').click();
    cy.get("#total").should("have.text", "7");
  });

  it("2개의 숫자에 대해 곱셉이 가능하다.", () => {
    cy.get('[data-digit="8"]').click();
    cy.get('[data-oper="x"]').click();
    cy.get('[data-digit="2"]').click();
    cy.get('[data-oper="="]').click();
    cy.get("#total").should("have.text", "16");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.get('[data-digit="8"]').click();
    cy.get('[data-oper="/"]').click();
    cy.get('[data-digit="2"]').click();
    cy.get('[data-oper="="]').click();
    cy.get("#total").should("have.text", "4");
  });
});

describe("클리어 기능", () => {
  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get('[data-digit="9"]').click();

    cy.get(".js-modifier").click();
    cy.get("#total").should("have.text", "0");
  });
});

describe("예외 처리", () => {
  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get('[data-digit="9"]').click();
    cy.get('[data-digit="9"]').click();
    cy.get('[data-digit="9"]').click();
    cy.get('[data-digit="9"]').click();

    cy.get("#total").should("have.text", "999");
  });
});

describe("결과", () => {
  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get('[data-digit="3"]').click();
    cy.get('[data-digit="3"]').click();
    cy.get('[data-oper="/"]').click();
    cy.get('[data-digit="4"]').click();
    cy.get('[data-oper="="]').click();
    cy.get("#total").should("have.text", "8");
  });

  it("0으로 나눌 수 없다..", () => {
    cy.get('[data-digit="3"]').click();
    cy.get('[data-digit="0"]').click();
    cy.get('[data-oper="/"]').click();
    cy.get('[data-digit="0"]').click();
    cy.get('[data-oper="="]').click();
    cy.get("#total").should("have.text", "0으로 나눌 수 없습니다.");
  });
});
