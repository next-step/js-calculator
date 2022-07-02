import { Operation, Sum, Subtract, Multiple, Divide } from "../operations";

test("throw error when executing not implemented operator", () => {
  expect(() => new Operation().operate(1, 2)).toThrow();
});

test("adds 1 + 2 to equal 3", () => {
  expect(new Sum().operate(1, 2)).toBe(3);
});

test("subtracts 1 - 2 to equal -1", () => {
  expect(new Subtract().operate(1, 2)).toBe(-1);
});

test("multiples 1 * 2 to equal 2", () => {
  expect(new Multiple().operate(1, 2)).toBe(2);
});

test("divides 1 / 2 to equal 0", () => {
  expect(new Divide().operate(1, 2)).toBe(0);
});

test("divides 3 / 0 to equal infinity", () => {
  expect(new Divide().operate(3, 0)).toBe(Infinity);
});
