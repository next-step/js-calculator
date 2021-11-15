import { DEFAULT_NUMBER, MODIFIER, OPERATION } from "../../src/js/constants/calculator.js";
import { ALERT_MESSAGE } from "../../src/js/constants/messages.js";
import { SAMPLE_NUMBER } from "../constants/numbers.js";

before(() => {
  cy.visit("/");
});

describe("계산기 테스트", () => {
  beforeEach(() => {
    cy.clickModifierButton(MODIFIER.ALL_CLEAR);
  });

  it("all clear 버튼을 누르면 결과창의 숫자가 default number를 나타낸다", () => {
    cy.get("#total").then(($total) => ($total.textContent = 10));
    cy.clickModifierButton(MODIFIER.ALL_CLEAR);
    cy.calcTotalValueShouldBe(DEFAULT_NUMBER);
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber + secondNumber;

    cy.clickNumberButton(firstNumber);
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber - secondNumber;

    cy.clickNumberButton(firstNumber);
    cy.clickOperationButton(OPERATION.SUBTRACTION);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber * secondNumber;

    cy.clickNumberButton(firstNumber);
    cy.clickOperationButton(OPERATION.MULTIPLICATION);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다. 이때, 소수점 이하는 버린다.", () => {
    const [firstNumber, secondNumber] = SAMPLE_NUMBER;
    const expectedResult = Math.floor(firstNumber / secondNumber);

    cy.clickNumberButton(firstNumber);
    cy.clickOperationButton(OPERATION.DIVISTION);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("두 자리 수를 포함한 2개의 숫자에 대해 연산이 가능하다.", () => {
    const [firstNumber, secondNumber, thirdNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber * 10 + secondNumber + thirdNumber;

    cy.clickNumberButton(firstNumber);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickNumberButton(thirdNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("이전 결과에 이어서 연산을 수행할 수 있다.", () => {
    const [firstNumber, secondNumber, thirdNumber] = SAMPLE_NUMBER;
    const expectedResult = firstNumber + secondNumber + thirdNumber;

    cy.clickNumberButton(firstNumber);
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickNumberButton(secondNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickNumberButton(thirdNumber);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.calcTotalValueShouldBe(expectedResult);
  });

  it("숫자는 한 번에 최대 3자리 수까지 입력 가능하다.", () => {
    const [number] = SAMPLE_NUMBER;
    const expectedResult = number * 100 + number * 10 + number;

    [...Array(3)].forEach(() => cy.clickNumberButton(number));
    cy.calcTotalValueShouldBe(expectedResult);

    cy.clickNumberButton(number);
    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.EXCEEDED_MAX_DIGIT_COUNT(3)));
  });

  it("연산자는 한 번에 하나씩만 입력할 수 있다.", () => {
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickOperationButton(OPERATION.ADDITION);

    cy.on("window:alert", (text) =>
      expect(text).to.contains(ALERT_MESSAGE.INVALID_EXPRESSION.EXCEEDED_OPERATION_COUNT)
    );
  });

  it("수식에는 반드시 연산자가 포함되어야한다.", () => {
    const [number] = SAMPLE_NUMBER;

    cy.clickNumberButton(number);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.INVALID_EXPRESSION.NO_OPERATION));
  });

  it("수식은 반드시 숫자로 끝나야한다.", () => {
    const [number] = SAMPLE_NUMBER;

    cy.clickNumberButton(number);
    cy.clickOperationButton(OPERATION.ADDITION);
    cy.clickOperationButton(OPERATION.CALCULATION);

    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.INVALID_EXPRESSION.NO_RIGHT_VALUE));
  });
});
