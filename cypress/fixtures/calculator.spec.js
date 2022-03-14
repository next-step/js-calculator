import { OPERATION } from "../../src/js/constants/calculator";
import { RANDOM_NUMBER } from "../../src/js/constants/randomNumber";
import { range } from "../../src/js/utils/Range";

const BASE_URL = cy.config('baseUrl');

before(() => cy.visit(BASE_URL));

context("calculator", () => {
    beforeEach(() => {
        cy.get("#total").then(($total) => ($total.textContent = RANDOM_NUMBER));
    })

    it("should append given two integers", () => {
        const [first, second] = RANDOM_NUMBER;
        const expected = first + second;

        cy.clickNumberButton(first);
        cy.clickOperationButton(OPERATION.ADDITION);
        cy.clickNumberButton(second);
        cy.clickOperationButton(OPERATION.CALCULATION);

        cy.calcTotalValueShouldBe(expected);
    })
})