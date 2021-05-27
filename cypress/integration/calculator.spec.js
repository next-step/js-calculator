import { BASE_URL, SELECTORS, TEXTS, ERROR_MESSAGES } from "../utils/index.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("초기에 0 값을 가진다.", () => {
    cy.get(SELECTORS.$total).should("have.text", "0");
  });

  it("숫자를 누르면 표시되는 값이 변한다.", () => {
    [9, 1].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$total).should("have.text", "91");
  });

  it("숫자는 4자리 이상을 입력할 수 없다.", () => {
    [1, 2, 3, 4].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(ERROR_MESSAGES.DIGIT_OVER_ERROR);
    });
    cy.get(SELECTORS.$total).should("have.text", "123");
  });

  it("연산자만 연속으로 입력할 수 없다.", () => {
    [TEXTS.mult, TEXTS.sub].forEach((opers) =>
      cy.get(SELECTORS.$operation).contains(opers).click()
    );
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(ERROR_MESSAGES.OPERATOR_OVER_ERROR);
    });
    cy.get(SELECTORS.$total).should("have.text", "0X");
  });

  it("AC를 누르면 0으로 초기화한다.", () => {
    cy.get(SELECTORS.$modifier).click();
    cy.get(SELECTORS.$total).should("have.text", "0");
  });

  it("덧셈 연산을 수행한다.", () => {
    cy.get(SELECTORS.$digit).contains(1).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.sum).click();
    cy.get(SELECTORS.$digit).contains(1).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "2");
  });

  it("곱셈 연산을 수행한다", () => {
    cy.get(SELECTORS.$digit).contains(2).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.mult).click();
    cy.get(SELECTORS.$digit).contains(2).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "4");
  });

  it("나눗셈 연산을 수행하며, 소숫점 이하는 버림한다.", () => {
    cy.get(SELECTORS.$digit).contains(6).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.div).click();
    cy.get(SELECTORS.$digit).contains(5).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "1");
  });

  it("뺄셈 연산을 수행한다.", () => {
    cy.get(SELECTORS.$digit).contains(6).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.sub).click();
    cy.get(SELECTORS.$digit).contains(5).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "1");
  });

  it("두 자리 이상의 숫자 연산을 수행한다.", () => {
    [6, 6].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$operation).contains(TEXTS.mult).click();
    [1, 0].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "660");
  });

  it("사칙 연산을 적용한다.", () => {
    [6, 6].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$operation).contains(TEXTS.mult).click();
    [1, 0].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$operation).contains(TEXTS.sub).click();
    [1, 0].forEach((number) =>
      cy.get(SELECTORS.$digit).contains(number).click()
    );
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "650");
  });

  it("0으로 나눌 경우 Infinity를 반환한다.", () => {
    cy.get(SELECTORS.$digit).contains(6).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.div).click();
    cy.get(SELECTORS.$digit).contains(0).click();
    cy.get(SELECTORS.$operation).contains(TEXTS.result).click();
    cy.get(SELECTORS.$total).should("have.text", "Infinity");
  });
});
