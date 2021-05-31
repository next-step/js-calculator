import {
  BASE_URL,
  SELECTORS,
  TEXTS,
  ERROR_MESSAGES,
  calculate,
} from "../utils/index.js";

describe("calculator", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("숫자 버튼", () => {
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
  });

  describe("AC 버튼", () => {
    it("AC를 누르면 0으로 초기화한다.", () => {
      cy.get(SELECTORS.$modifier).click();
      cy.get(SELECTORS.$total).should("have.text", "0");
    });
  });

  describe("연산자 버튼", () => {
    it("연산자만 연속으로 입력할 수 없다.", () => {
      [TEXTS.mult, TEXTS.sub].forEach((opers) =>
        cy.get(SELECTORS.$operation).contains(opers).click()
      );
      cy.on("window:alert", (txt) => {
        expect(txt).to.contains(ERROR_MESSAGES.OPERATOR_OVER_ERROR);
      });
      cy.get(SELECTORS.$total).should("have.text", "0X");
    });
  });

  describe("연산", () => {
    [
      { num1: 1, num2: 2 },
      { num1: 11, num2: 150 },
      { num1: 150, num2: 11 },
    ].forEach(({ num1, num2 }) => {
      it(`더하기 ${num1}+${num2}`, () => {
        const operator = TEXTS.sum;
        calculate(num1, num2, operator);
        cy.get(SELECTORS.$total).should("have.text", num1 + num2);
      });

      it(`곱하기 ${num1}*${num2}`, () => {
        const operator = TEXTS.mult;
        calculate(num1, num2, operator);
        cy.get(SELECTORS.$total).should("have.text", num1 * num2);
      });

      it(`빼기 ${num1}-${num2}`, () => {
        const operator = TEXTS.sub;
        calculate(num1, num2, operator);
        cy.get(SELECTORS.$total).should("have.text", num1 - num2);
      });

      it(`나누기 ${num1}/ ${num2}`, () => {
        const operator = TEXTS.div;
        calculate(num1, num2, operator);
        cy.get(SELECTORS.$total).should("have.text", Math.floor(num1 / num2));
      });
    });
  });
});
