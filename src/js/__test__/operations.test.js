import { Operation, Sum, Subtract, Multiple, Divide, getOperations, OPERATION_MAP } from "../operations";

describe("operation", () => {
  test("throw error when executing not implemented operator", () => {
    expect(() => new Operation().operate(1, 2)).toThrow();
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(new Sum().operate(1, 2)).toBe(3);
  });

  test("stringify add operation to be +", () => {
    const sum = new Sum();
    const expected = "+";
    expect(sum.toString()).toBe(expected);
    expect(`${sum}`).toBe(expected);
  });

  test("subtracts 1 - 2 to equal -1", () => {
    expect(new Subtract().operate(1, 2)).toBe(-1);
  });

  test("stringify subtract operation to be -", () => {
    const subtract = new Subtract();
    const expected = "-";
    expect(subtract.toString()).toBe(expected);
    expect(`${subtract}`).toBe(expected);
  });

  test("multiples 1 * 2 to equal 2", () => {
    expect(new Multiple().operate(1, 2)).toBe(2);
  });

  test("stringify multiple operation to be X", () => {
    const multiple = new Multiple();
    const expected = "X";
    expect(multiple.toString()).toBe(expected);
    expect(`${multiple}`).toBe(expected);
  });

  test("divides 1 / 2 to equal 0", () => {
    expect(new Divide().operate(1, 2)).toBe(0);
  });

  test("divides -7 / 3 to equal -3", () => {
    expect(new Divide().operate(-7, 3)).toBe(-3);
  });

  test("divides 3 / 0 to equal infinity", () => {
    expect(new Divide().operate(3, 0)).toBe(Infinity);
  });

  test("stringify divide operation to be /", () => {
    const divide = new Divide();
    const expected = "/";
    expect(divide.toString()).toBe(expected);
    expect(`${divide}`).toBe(expected);
  });

  test.each(Object.entries(OPERATION_MAP))("get operation", (key, value) => {
    expect(getOperations(key)).toBe(value);
  });
});
