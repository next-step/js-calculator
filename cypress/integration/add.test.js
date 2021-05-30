import { canvasToBlob } from "blob-util";

describe("ui-counter", () => {
  beforeEach(() => {
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
    cy.visit("http://localhost:21513/");
  });

  it("+ 버튼 클릭시 1 증가한다.", () => {
    for (let i = 0; i < 3; i++) {
      cy.visit("http://localhost:21513/");
      //random값 클릭
      const num1 = clickNum();
      // +값
      btnClick(".operation", "+");
      // random값 클릭
      const num2 = clickNum();
      btnClick(".operation", "=");

      cy.get("#total").should("have.text", num1 + num2);
    }
  });

  function clickNum() {
    const num = String(Math.floor(Math.random() * 1000));
    for (let i = 0; i < num.length; i++) {
      btnClick(".digit", num.charAt(i));
    }
    // num.forEach((n) => btnClick(".digit", n));
    // cy.get(".digit").contains((n) => btnClick("digit", n));
    return Number(num);
  }

  function btnClick(selector, value) {
    cy.get(selector).contains(value).click();
  }
});
