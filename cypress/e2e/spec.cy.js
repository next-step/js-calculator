/**
 * 1. 테스트 코드를 작성한 뒤 한번 commit 하고
 * 2. 코드를 만들고 다시 한번더 commit
 * 3. 리팩토링하고 commit
 * 4. 제출
 */

import calculator from "../../src/js/calculator";

describe("계산기", () => {
  before(() => {
    cy.visit("");
  });

  context("사칙 연산 로직이 정상 동작하는지 확인한다.", () => {
    it("덧셈을 한다.", () => {
      expect(calculator.plus(1, 2)).eq(3);
    });

    it("뺄셈을 한다.", () => {
      expect(calculator.minus(8, 2)).eq(6);
    });

    it("곱셈을 한다.", () => {
      expect(calculator.multiply(2, 3)).eq(6);
    });

    it("나눗셈을 한다.", () => {
      expect(calculator.divide(8, 2)).eq(4);
    });

    it("계산 결과를 표현할 때 소수점은 버린다.", () => {
      expect(calculator.divide(21, 4)).eq(5);
    });
  });

  context("한 자리수 연산", () => {
    beforeEach(() => {
      cy.allClear();
    });

    it("1+1", () => {
      cy.clickDigit("1");
      cy.clickOperator("+");
      cy.clickDigit("1");
      cy.totalIs("2");
    });

    it("9/9", () => {
      cy.clickDigit("9");
      cy.clickOperator("/");
      cy.clickDigit("9");
      cy.totalIs("1");
    });

    it("9X9", () => {
      cy.clickDigit("9");
      cy.clickOperator("X");
      cy.clickDigit("9");
      cy.totalIs("81");
    });
  });
  context("두 자리수 연산", () => {
    beforeEach(() => {
      cy.allClear();
    });

    it("10-22", () => {
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.clickOperator("-");
      cy.clickDigit("2");
      cy.clickDigit("2");
      cy.totalIs("-12");
    });

    it("10+10", () => {
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.clickOperator("+");
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.totalIs("20");
    });
  });
  context("세 자리수 연산", () => {
    beforeEach(() => {
      cy.allClear();
    });

    it("100+100", () => {
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.clickDigit("0");
      cy.clickOperator("+");
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.clickDigit("0");
      cy.totalIs("200");
    });
  });
  context("예외숫자 연산", () => {
    beforeEach(() => {
      cy.allClear();
    });
    it("0+4", () => {
      cy.clickDigit("0");
      cy.clickOperator("+");
      cy.clickDigit("4");
      cy.totalIs("4");
    });

    it("0X4", () => {
      cy.clickDigit("0");
      cy.clickOperator("X");
      cy.clickDigit("4");
      cy.totalIs("0");
    });

    it("10/4", () => {
      cy.clickDigit("1");
      cy.clickDigit("0");
      cy.clickOperator("/");
      cy.clickDigit("4");
      cy.totalIs("2");
    });

    it("05+007", () => {
      cy.clickDigit("0");
      cy.clickDigit("5");
      cy.clickOperator("-");
      cy.clickDigit("0");
      cy.clickDigit("0");
      cy.clickDigit("7");
      cy.totalIs("-2");
    });
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.clickDigit("1");
    cy.clickDigit("1");
    cy.allClear();
    cy.totalIs("0");
  });
});
