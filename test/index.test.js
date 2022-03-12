import { describe, it, expect } from "vitest";
import CalculateCore from "../src/js/model/Calculate";

describe("calculator", () => {
  let calculateCore = new CalculateCore();
  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    expect(calculateCore.calculate(["1", "+", "2"])).eq(3);
  });
  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    expect(calculateCore.calculate(["2", "-", "2"])).eq(0);
  });
  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    expect(calculateCore.calculate(["2", "X", "2"])).eq(4);
  });
  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    expect(calculateCore.calculate(["2", "/", "2"])).eq(1);
  });
  it('연속된 숫자를 입력하면 하나의 숫자로 인식한다.', () => {
    expect(calculateCore.calculate(["1", "2", "+", "3"])).eq(15);
    expect(calculateCore.calculate(["1", "2", "-", "3"])).eq(9);
    expect(calculateCore.calculate(["1", "2", "X", "3"])).eq(36);
    expect(calculateCore.calculate(["1", "2", "/", "3"])).eq(4);
  });
});
