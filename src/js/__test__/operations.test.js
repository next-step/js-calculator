import { sum, subtract, multiple, divide } from "../operations.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("subtracts 1 - 2 to equal -1", () => {
  expect(subtract(1, 2)).toBe(-1);
});

test("multiples 1 * 2 to equal 2", () => {
  expect(multiple(1, 2)).toBe(2);
});

test("divides 1 / 2 to equal 0", () => {
  expect(divide(1, 2)).toBe(0);
});

test("divides 3 / 0 to equal infinity", () => {
  expect(divide(3, 0)).toBe(Infinity);
});
