import { isButtonElement } from "../validators.js";

describe("isButtonElement", () => {
  test("return true when check button element", () => {
    expect(isButtonElement(document.createElement("button"))).toBe(true);
  });

  test("return false when check other element", () => {
    expect(isButtonElement(document.createElement("div"))).toBe(false);
  });
});
