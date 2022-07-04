import { Operation, getOperations, OPERATION_MAP } from "../operations";

describe("operation", () => {
  test("throw error when executing not implemented operator", () => {
    expect(() => Operation.getInstance()).toThrow();
  });

  test.each(Object.entries(OPERATION_MAP))("get operations", (key, value) => {
    expect(getOperations(key)).toBe(value);
  });

  test("adds 1 + 2 to equal 3", () => {
    expect(getOperations("+").operate(1, 2)).toBe(3);
  });

  test("stringify add operation to be +", () => {
    const sum = getOperations("+");
    const expected = "+";
    expect(sum.toString()).toBe(expected);
    expect(`${sum}`).toBe(expected);
  });

  test("subtracts 1 - 2 to equal -1", () => {
    expect(getOperations("-").operate(1, 2)).toBe(-1);
  });

  test("stringify subtract operation to be -", () => {
    const subtract = getOperations("-");
    const expected = "-";
    expect(subtract.toString()).toBe(expected);
    expect(`${subtract}`).toBe(expected);
  });

  test("multiples 1 * 2 to equal 2", () => {
    expect(getOperations("X").operate(1, 2)).toBe(2);
  });

  test("stringify multiple operation to be X", () => {
    const multiple = getOperations("X");
    const expected = "X";
    expect(multiple.toString()).toBe(expected);
    expect(`${multiple}`).toBe(expected);
  });

  test("divides 1 / 2 to equal 0", () => {
    expect(getOperations("/").operate(1, 2)).toBe(0);
  });

  test("divides -7 / 3 to equal -3", () => {
    expect(getOperations("/").operate(-7, 3)).toBe(-3);
  });

  test("divides 3 / 0 to equal infinity", () => {
    expect(getOperations("/").operate(3, 0)).toBe(Infinity);
  });

  test("stringify divide operation to be /", () => {
    const divide = getOperations("/");
    const expected = "/";
    expect(divide.toString()).toBe(expected);
    expect(`${divide}`).toBe(expected);
  });
});
