/// <reference types="cypress" />

import Expression from "../../../src/js/constants/Expression.js";
import Message from "../../../src/js/constants/Message.js";
import { SAMPLE_NUMBER } from "../../../src/js/utils/test.util.js";

const LIVE_SERVER_URL = "http://127.0.0.1:5500/";

describe("계산기 요구조건을 만족한다.", () => {
  beforeEach(() => {
    cy.visit(LIVE_SERVER_URL);
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber + secondNumber;

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.plus);
    cy.clickNumberButton(secondNumber.toString().split(""));
    cy.clickExpressionButton(Expression.calculate);

    cy.calcShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber - secondNumber;

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.minus);
    cy.clickNumberButton(secondNumber.toString().split(""));
    cy.clickExpressionButton(Expression.calculate);

    cy.calcShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber * secondNumber;

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.multiply);
    cy.clickNumberButton(secondNumber.toString().split(""));
    cy.clickExpressionButton(Expression.calculate);

    cy.calcShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = Math.floor(firstNumber / secondNumber);

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.devide);
    cy.clickNumberButton(secondNumber.toString().split(""));
    cy.clickExpressionButton(Expression.calculate);

    cy.calcShouldBe(expectedResult);
  });

  it("0으로 나눌 수 없다", () => {
    const [firstNumber] = SAMPLE_NUMBER;
    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.devide);
    cy.clickNumberButton(["0"]);
    cy.clickExpressionButton(Expression.calculate);

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(Message.cannotDevideWithZero);
    });
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    const [firstNumber] = SAMPLE_NUMBER;

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.calcShouldBe(firstNumber);
    cy.clickClearButton();
    cy.calcShouldBe(0);
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const firstNumber = "1000";
    cy.clickNumberButton(firstNumber.split(""));
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(Message.numberValidationError);
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const firstNumber = 40,
      secondNumber = 3;
    const expectedResult = Math.floor(firstNumber / secondNumber);

    cy.clickNumberButton(firstNumber.toString().split(""));
    cy.clickExpressionButton(Expression.devide);
    cy.clickNumberButton(secondNumber.toString().split(""));
    cy.clickExpressionButton(Expression.calculate);

    cy.calcShouldBe(expectedResult);
  });
});
