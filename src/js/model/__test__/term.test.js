import { Term } from "../term.js";

describe("Term Model", () => {
  test("initialized term value is undefined", () => {
    expect(new Term().value).toBe(undefined);
  });

  test("append term value", () => {
    const term = new Term();
    term.append("1");
    expect(term.value).toBe(1);
    term.append("2");
    expect(term.value).toBe(12);
  });

  test("throw Error when term length is over 3", () => {
    const term = new Term();
    expect(() => term.append("1345")).toThrow();
  });

  test("set value", () => {
    const term = new Term();
    const mock = 999;
    term.value = mock;
    expect(term.value).toBe(mock);
  });

  test("reset term value", () => {
    const term = new Term();
    expect(term.value).toBe(undefined);
    term.append(1);
    expect(term.value).toBe(1);
    term.clear();
    expect(term.value).toBe(undefined);
  });
});
