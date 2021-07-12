import { operating, exceptMaxNumOperating } from "./helper.js";

describe("js-calulator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4001/");
  });
  it("2개의 숫자에 대해 덧셈이 가능하다.", operating(7, 9, "+", 1, "=", 80));
  it("2개의 숫자에 대해 뺄셈이 가능하다.", operating(5, 5, "-", 1, 2, "=", 43));
  it("2개의 숫자에 대해 곱셈이 가능하다.", operating(8, "X", 9, "=", 72));
  it("2개의 숫자에 대해 나눗셈이 가능하다.", operating(3, 6, "/", 6, "=", 6));
  it("AC를 누르면 0으로 초기화 한다.", operating(3, 6, "/", 6, "=", 6, "AC"));
  //prettier-ignore
  it("숫자는 최대 3자리까지 입력 가능하다.", exceptMaxNumOperating(9, 9, 9, 9, 999));
  //prettier-ignore
  it("계산 결과를 표현할 때 소수점 이하는 버림한다. ",operating(3, 5, "/", 2, "=", 17));
});
