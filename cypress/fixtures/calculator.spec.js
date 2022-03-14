import { expect } from "chai";
import { it } from "mocha";
import { DEFAULT_NUMBER, MODIFIER, OPERATION } from "../../src/js/constants/calculator";
import { ALERT_MESSAGE } from "../../src/js/constants/messages";
import { RANDOM_NUMBER } from "../../src/js/constants/randomNumber";
import { range } from "../../src/js/utils/Range";

const BASE_URL = cy.config('baseUrl');

before(() => cy.visit(BASE_URL));

context("calculator", () => {
    beforeEach(() => {
        cy.clickModifierButton(MODIFIER.AC);
    })

    it("should append given two integers", () => {
        // given
        const [first, second] = RANDOM_NUMBER;
        const expected = first + second;

        // when
        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // then
        cy.calcTotalValueShouldBe(expected);
    })

    it("should subtract given two integers", () => {
        const [first, second] = RANDOM_NUMBER;
        const expected = first - second;

        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.SUBTRACTION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        cy.calcTotalValueShouldBe(expected);
    })

    it("should multiply given two integers", () => {
        const [first, second] = RANDOM_NUMBER;
        const expected = first * second;

        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.MULTIPLICATION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        cy.calcTotalValueShouldBe(expected);
    })

    it("should divide given two integers, noting that not dealing with decimal points", () => {
        const [first, second] = RANDOM_NUMBER;
        const expected = Math.floor(first / second);

        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.DIVISION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        cy.calcTotalValueShouldBe(expected);
    })

    it("should reset to default number when conducting all clear", () => {
        // given
        cy.get('#total').then(($total) => ($total.textContent = 10));
        
        // when
        cy.clickModifierButton(MODIFIER.AC);
        
        // then
        cy.calcTotalValueShouldBe(DEFAULT_NUMBER);
    })

    it("Numbers can be entered up to three digits at a time.", () => {
        const [number] = RANDOM_NUMBER;
        const expected = number * 100 + number * 10 + number;

        // given
        [...Array(3)].forEach(() => cy.clickNumberButton(number));
        cy.calcTotalValueShouldBe(expected);

        // when
        cy.clickNumberButton(number);

        // then
        cy.on("window:alert", (text) => {
            expect(text).to.contains(ALERT_MESSAGE.EXCEEDED_MAX_DIGIT_COUNT(text));
        })
    })

    it("Operations are possible for two numbers, including two digits.", () => {
        // given
        const [first, second, third] = RANDOM_NUMBER;
        const expected = first * 10 + second + third;

        cy.clickNumberButton(first);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.ADDITION);

        // when
        cy.clickNumberButton(third);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // then
        cy.calcTotalValueShouldBe(expected);
    })

    it("Operations can be performed following the previous result.", () => {
        // given
        const [first, second, third] = RANDOM_NUMBER;
        const expected = first + second + third;

        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // when
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickNumberButton(third);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // then
        cy.calcTotalValueShouldBe(expected);
    })

    it("Only one operator can be entered between each integers.", () => {
        // given
        const [number] = RANDOM_NUMBER;
        
        // when
        cy.clickNumberButton(number);
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickOperationButton(OPERATION.ADDITION);

        // then
        cy.on("window:alert", (text) => {
            expect(text).to.contains(ALERT_MESSAGE.EXCEEDED_OPERATION_COUNT);
        })
    })

    it("the equation must include an operator.", () => {
        // given
        const [number] = RANDOM_NUMBER;

        // when
        cy.clickNumberButton(number);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // then
        cy.on("window:alert", (text) => {
            expect(text).to.contains(ALERT_MESSAGE.NO_OPERATION);
        })
    })

    it("the equation must end in numbers.", () => {
        // given
        const [number] = RANDOM_NUMBER;

        // when
        cy.clickNumberButton(number);
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickOperationButton(OPERATION.CALCULATION);

        // then
        cy.on("window:alert", (text) => {
            expect(text).to.contains(ALERT_MESSAGE.NO_RIGHT_VALUE);
        })
    })
})