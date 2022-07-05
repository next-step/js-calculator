import { hasClassName, isButtonElement, isButtonHasClassName } from "../validators.js";

describe("isButtonElement", () => {
  test("return true when check button element", () => {
    expect(isButtonElement(document.createElement("button"))).toBe(true);
  });

  test("return false when check other element", () => {
    expect(isButtonElement(document.createElement("div"))).toBe(false);
  });
});

describe("hasClassName", () => {
  const className = "mock";
  const element = document.createElement("div");
  element.classList.add(className);

  test("return true when element has  className", () => {
    expect(hasClassName(element, className)).toBe(true);
  });

  test("return false when element does not have className", () => {
    expect(hasClassName(element, "foo")).toBe(false);
  });
});

describe("isButtonHasClassName", () => {
  const className = "mock";
  const button = document.createElement("button");
  button.classList.add(className);

  const div = document.createElement("div");
  div.classList.add(className);

  test("return true when button has className", () => {
    expect(isButtonHasClassName(button, className)).toBe(true);
  });

  test("return false when button does not have className", () => {
    expect(isButtonHasClassName(button, "foo")).toBe(false);
  });

  test("return false when element is not button", () => {
    expect(isButtonHasClassName(div, className)).toBe(false);
    expect(isButtonHasClassName(div, "foo")).toBe(false);
  });
});
