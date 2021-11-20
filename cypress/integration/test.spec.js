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
});
