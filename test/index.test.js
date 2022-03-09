import { describe, it, expect } from "vitest";
import calculate from "../src/js/index.mjs";

describe("계산기", () => {
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    expect(calculate(["1", "+", "2"])).eq(3);
  });
  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    expect(calculate(["2", "-", "2"])).eq(0);
  });
  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    expect(calculate(["2", "*", "2"])).eq(4);
  });
  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    expect(calculate(["2", "/", "2"])).eq(1);
  });
});
