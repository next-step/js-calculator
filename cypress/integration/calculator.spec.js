import { BASE_URL, SELECTORS, TEXTS, ERROR_MESSAGES } from "../utils/index.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("초기에 0 값을 가진다.", () => {
    cy.get(SELECTORS.$total).should("have.text", "0");
  });

  it("숫자를 누르면 표시되는 값이 변한다.", () => {
    cy.get(SELECTORS.$digit).contains(9).click();
    cy.get(SELECTORS.$digit).contains(1).click();
    cy.get(SELECTORS.$total).should("have.text", "91");
  });

  it("숫자는 4자리 이상을 입력할 수 없다.", () => {
    cy.get(SELECTORS.$digit).contains(1).click();
    cy.get(SELECTORS.$digit).contains(2).click();
    cy.get(SELECTORS.$digit).contains(3).click();
    cy.get(SELECTORS.$digit).contains(4).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(ERROR_MESSAGES.DIGIT_OVER_ERROR);
    });
    cy.get(SELECTORS.$total).should("have.text", "123");
  });

  // it("연산자만 연속으로 입력할 수 없다.",()=>{

  // })

  // it("덧셈 연산을 수행한다.", () => {

  // });

  // it("곱셈 연산을 수행한다", () => {});

  // it("나눗셈 연산을 수행하며, 소숫점 이하는 버림한다.", () => {});

  it("AC를 누르면 0으로 초기화한다.", () => {
    cy.get(SELECTORS.$modifier).click();
    cy.get(SELECTORS.$total).should("have.text", "0");
  });

  // it("사칙 연산을 적용한다.", () => {});
});
