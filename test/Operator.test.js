import {describe, beforeEach, it, expect} from "vitest";
import {Operator} from "../src/js/Operator.mjs";

describe("Operator", () => {
    let operator = new Operator();
    beforeEach(() => {
        operator = new Operator();
    });
    describe("isOperator()", () => {
        it("연산자가 아니라면 false를 반환한다.", () => {
            expect(operator.isOperator('a')).eq(false);
        });
    });
    describe("execute()", () => {
        it("+ 연산을 수행한다.", () => {
            expect(operator.execute('+', 1, 2)).eq(3);
        });
        it("- 연산을 수행한다.", () => {
            expect(operator.execute('-', 5, 2)).eq(3);
        });
        it("/ 연산을 수행한다.", () => {
            expect(operator.execute('/', 9, 3)).eq(3);
        });
        it("* 연산을 수행한다.", () => {
            expect(operator.execute('X', 1, 2)).eq(2);
        });
    })
});
