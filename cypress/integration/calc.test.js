import { canvasToBlob } from "blob-util";

describe("ui-counter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:21513/");
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
  });

  it("+ 연산", () => {
    for (let i = 0; i < 3; i++) {
      clear();
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

  it("- 연산", () => {
    for (let i = 0; i < 3; i++) {
      clear();
      //random값 클릭
      const num1 = clickNum();
      // +값
      btnClick(".operation", "-");
      // random값 클릭
      const num2 = clickNum();
      btnClick(".operation", "=");

      cy.get("#total").should("have.text", num1 - num2);
    }
  });

  it("-값 입력후 +연산", () => {
    for (let i = 0; i < 3; i++) {
      clear();
      //random값 클릭
      btnClick(".operation", "-");
      const num1 = -clickNum();
      // +값
      btnClick(".operation", "+");
      // random값 클릭
      const num2 = clickNum();
      btnClick(".operation", "=");

      cy.get("#total").should("have.text", num1 + num2);
    }
  });

  it("X 연산", () => {
    for (let i = 0; i < 3; i++) {
      clear();
      //random값 클릭
      const num1 = clickNum();
      // +값
      btnClick(".operation", "X");
      // random값 클릭
      const num2 = clickNum();
      btnClick(".operation", "=");

      cy.get("#total").should("have.text", num1 * num2);
    }
  });

  it("/ 연산(소수점 확인)", () => {
    for (let i = 0; i < 3; i++) {
      clear();
      //random값 클릭
      const num1 = clickNum();
      // +값
      btnClick(".operation", "/");
      // random값 클릭
      const num2 = clickNum();
      btnClick(".operation", "=");

      cy.get("#total").should("have.text", Math.floor(num1 / num2));
    }
  });

  it("AC버튼클릭", () => {
    clear();
    //random값 클릭
    const num1 = clickNum();
    // +값
    btnClick(".operation", "+");
    cy.get(".modifier").contains("AC").click();

    cy.get("#total").should("have.text", 0);
  });

  it("3자리수 까지만 입력 확인", () => {
    clear();
    btnClick(".digit", 1);
    btnClick(".digit", 1);
    btnClick(".digit", 1);
    btnClick(".digit", 1);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
    });
  });

  it("2번째 수 3자리수 까지만 입력 확인", () => {
    clear();
    clickNum();
    btnClick(".operation", "/");
    btnClick(".digit", 1);
    btnClick(".digit", 1);
    btnClick(".digit", 1);
    btnClick(".digit", 1);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("숫자는 한번에 최대 3자리 수까지 입력 가능합니다.");
    });
  });

  function clear() {
    cy.get(".modifier").contains("AC").click();
  }

  function clickNum() {
    const num = String(Math.floor(Math.random() * 1000));
    for (let i = 0; i < num.length; i++) {
      btnClick(".digit", num.charAt(i));
    }
    return Number(num);
  }

  function btnClick(selector, value) {
    cy.get(selector).contains(value).click();
  }
});
