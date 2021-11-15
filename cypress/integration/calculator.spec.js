import { OPERATION, BUTTON_TYPE, LIVE_SERVER } from "../../src/js/constants.js";

const TEST_SET = [
    [2, 2],
    [10, 10],
    [30, 100],
    [98, 8],
    [1999, 1],
];

describe("calculator", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
        const [previousValue, currentValue] = TEST_SET[0];
        const expectedResult = previousValue + currentValue;

        cy.clickDigit(previousValue);
        cy.clickOperation(OPERATION.ADD);
        cy.clickDigit(currentValue);
        cy.clickOperation(OPERATION.EQUAL);
        cy.totalValue(expectedResult);
    });
});

describe("calculator", () => {
    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
        const [previousValue, currentValue] = TEST_SET[1];
        const expectedResult = previousValue - currentValue;

        cy.clickDigit(previousValue);
        cy.clickOperation(OPERATION.MINUS);
        cy.clickDigit(currentValue);
        cy.clickOperation(OPERATION.EQUAL);
        cy.totalValue(expectedResult);
    });
});

describe("calculator", () => {
    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
        const [previousValue, currentValue] = TEST_SET[2];
        const expectedResult = previousValue * currentValue;

        cy.clickDigit(previousValue);
        cy.clickOperation(OPERATION.MULTIPLY);
        cy.clickDigit(currentValue);
        cy.clickOperation(OPERATION.EQUAL);
        cy.totalValue(expectedResult);
    });
});

describe("calculator", () => {
    it("2개의 숫자에 대해 나눗셈이 가능하다. & 계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
        const [previousValue, currentValue] = TEST_SET[3];
        const expectedResult = Math.floor(previousValue / currentValue);

        cy.clickDigit(previousValue);
        cy.clickOperation(OPERATION.DIVIDE);
        cy.clickDigit(currentValue);
        cy.clickOperation(OPERATION.EQUAL);
        cy.totalValue(expectedResult);
    });
});

describe("calculator", () => {
    it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
        const expectedResult = 0;

        cy.clickModifier(previousValue);
        cy.totalValue(expectedResult);
    });
});

describe("calculator", () => {
    it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
        const [previousValue, currentValue] = TEST_SET[4];
        const expectedResult = previousValue.toString().slice(0, 3);

        cy.clickDigit(previousValue);
        cy.totalValue(expectedResult);
    });
});
