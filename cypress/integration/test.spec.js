import { MODIFIER, OPERATION } from "../../src/js/constants/calculator";

before(() => {
  //테스트를 하려는 테스트 url로 이동
  cy.visit("/");
});

describe("JS 계산기", function () {
  const example = [
    [1, 5],
    [10, 50],
    [500, 100],
    [100, 33],
  ];

  const makeDefaultTester = (testcase, operation, result) => {
    it(testcase, () => {
      example.forEach(([num1, num2]) => {
        cy.clickNumberButton(num1);
        cy.clickOperationButton(operation);
        cy.clickNumberButton(num2);
        cy.clickOperationButton(OPERATION.EQUAL);
        cy.resultShouldBe(result(num1, num2));
      });
    });
  };

  beforeEach(() => {
    cy.clickModifierButton(MODIFIER.CLEAR);
  });

  makeDefaultTester(
    "2개의 숫자에 대해 덧셈이 가능하다.",
    OPERATION.ADDITION,
    (a, b) => Math.trunc(a + b)
  );
  makeDefaultTester(
    "2개의 숫자에 대해 뺄셈이 가능하다.",
    OPERATION.SUBTRACTION,
    (a, b) => Math.trunc(a - b)
  );
  makeDefaultTester(
    "2개의 숫자에 대해 곱셈이 가능하다.",
    OPERATION.MULTIPLICATION,
    (a, b) => Math.trunc(a * b)
  );
  makeDefaultTester(
    "2개의 숫자에 대해 나눗셈이 가능하다.",
    OPERATION.DIVISION,
    (a, b) => Math.trunc(a / b)
  );

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.clickModifierButton(MODIFIER.CLEAR);
    cy.resultShouldBe(0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.clickNumberButton([7777]);

    cy.get("#total").then(($total) => {
      const val = $total.text();
      expect(val).to.have.length(3);
    });

    // 아래와 같은 방법도 된다.
    // cy.get("#total").invoke("text").then(parseFloat).should("eq", 777);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.clickNumberButton(10);
    cy.clickOperationButton(OPERATION.DIVISION);
    cy.clickNumberButton(3);
    cy.clickOperationButton(OPERATION.EQUAL);
    cy.get("#total").then(($total) => {
      const value = $total.text();
      expect(value).not.to.include(".");
    });
  });
});
