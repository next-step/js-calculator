// - [ ] 2개의 숫자에 대해 덧셈이 가능하다.
// - [ ] 2개의 숫자에 대해 뺄셈이 가능하다.
// - [ ] 2개의 숫자에 대해 곱셈이 가능하다.
// - [ ] 2개의 숫자에 대해 나눗셈이 가능하다.
// - [ ] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// - [ ] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// - [ ] 계산 결과를 표현할 때 소수점 이하는 버림한다.
// - [ ] 0으로 나눌 수 없다.

const BASE_URL = "http://127.0.0.1:5500";

const calculate = (operand1, operator, operand2) => {
  cy.get(`[data-digit="${operand1}"]`).click();
  cy.get(`[data-oper="${operator}"]`).click();

  if (operand2 !== undefined) {
    cy.get(`[data-digit="${operand2}"]`).click();
  }

  cy.get('[data-oper="="]').click();
};

beforeEach(() => {
  cy.visit(BASE_URL);
});

describe("계산 기능", () => {
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    calculate("9", "+", "9");
    cy.get("#total").should("have.text", "18");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    calculate("8", "-", "1");
    cy.get("#total").should("have.text", "7");
  });

  it("2개의 숫자에 대해 곱셉이 가능하다.", () => {
    calculate("8", "x", "2");

    cy.get("#total").should("have.text", "16");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    calculate("8", "/", "2");

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
    calculate("9", "/", "4");
    cy.get("#total").should("have.text", "2");
  });

  it("0으로 나눌 수 없다..", () => {
    calculate("9", "/", "0");
    cy.get("#total").should("have.text", "0으로 나눌 수 없습니다.");
  });
});
