// <reference types="cypress" />

const defaultValue = "0";
const operations = ["-", "+", "/", "X"];

describe("calculator", () => {
  const clickDigit = (number) => cy.get(".digit").contains(number).click();
  const clickAC = () => cy.get(".modifier").contains("AC").click();
  const clickOperation = (operation) =>
    cy.get(".operation").contains(operation).click();
  const clickEqual = () => cy.get(".operation").contains("=").click();
  const getTotal = () => cy.get("#total");

  beforeEach(() => {
    cy.visit("/");
  });

  it("화면을 처음 들어오면 total창에 defaultValue를 보여줍니다.", () => {
    // Assert(검증)
    getTotal().should("have.text", defaultValue);
  });

  describe("입력", () => {
    describe("숫자", () => {
      it("0을 먼저 클릭하면 total창에 defaultValue를 그대로 보여줍니다.", () => {
        // Act(실행)
        clickDigit("0");
        clickDigit("0");
        // Assert(검증)
        getTotal().should("have.text", defaultValue);
      });

      it("3자리까지 클릭한대로 total에 보여줍니다.", () => {
        // Act(실행)
        clickDigit("9");
        clickDigit("0");
        clickDigit("5");
        // Assert(검증)
        getTotal().should("have.text", "905");
      });

      it("4자리 숫자를 입력하면 alert 실행합니다", () => {
        // Arrange(준비)
        clickDigit("1");
        clickDigit("4");
        clickDigit("0");
        // Act(실행)
        clickDigit("0");
        // Assert(검증)
        cy.on("window:alert", (t) => {
          expect(t).to.contains("숫자는 세 자리까지만 입력 가능합니다!");
        });
      });

      it("4자리 숫자를 입력해도 3자리 숫자까지만 total에 보여줍니다.", () => {
        // Arrange(준비)
        clickDigit("5");
        clickDigit("3");
        clickDigit("9");
        // Act(실행)
        clickDigit("3");
        // Assert(검증)
        getTotal().should("have.text", "539");
      });
    });

    describe("연산자", () => {
      it("숫자를 입력하지 않고 연산자를 입력하면 alert 실행합니다.", () => {
        // Act(실행)
        clickOperation("-");
        // Assert(검증)
        cy.on("window:alert", (t) => {
          expect(t).to.contains("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
        });
      });

      it("연산자를 입력하고 연산자를 입력하면 alert 실행합니다.", () => {
        // Arrange(준비)
        clickDigit("3");
        clickOperation("-");
        // Act(실행)
        clickOperation("+");
        // Assertion(검증)
        cy.on("window:alert", (t) => {
          expect(t).to.contains("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
        });
      });
    });

    it("All Clear버튼을 total창은 defaultValue를 보여줍니다. -- 요구사항", () => {
      // Arrange(준비)
      clickDigit("1");
      clickDigit("8");
      clickOperation("-");
      // Act(실행)
      clickAC();
      // Assertion(검증)
      getTotal().should("have.text", defaultValue);
    });
  });

  describe("연산 -- 요구사항", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      // Arrange(준비)
      clickDigit("4");
      clickOperation("+");
      clickDigit("1");
      clickDigit("3");
      // Act(실행)
      clickEqual();
      // Assert(검증)
      getTotal().should("have.text", 17);
    });

    describe("뺄셈", () => {
      it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
        // Arrange(준비)
        clickDigit("4");
        clickOperation("-");
        clickDigit("2");
        // Act(실행)
        clickEqual();
        // Assert(검증)
        getTotal().should("have.text", 2);
      });

      it("뺄셈은 음수를 반환할 수 있다", () => {
        // Arrange(준비)
        clickDigit("3");
        clickOperation("-");
        clickDigit("5");
        // Act(실행)
        clickEqual();
        // Assert(검증)
        getTotal().should("have.text", -2);
      });
    });

    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
      // Arrange(준비)
      clickDigit("3");
      clickOperation("X");
      clickDigit("9");
      // Act(실행)
      clickEqual();
      // Assert(검증)
      getTotal().should("have.text", 27);
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      // Arrange(준비)
      clickDigit("9");
      clickOperation("/");
      clickDigit("3");
      // Act(실행)
      clickEqual();
      // Assert(검증)
      getTotal().should("have.text", 3);
    });

    it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
      // Arrange(준비)
      clickDigit("7");
      clickOperation("/");
      clickDigit("2");
      // Act(실행)
      clickEqual();
      // Assert(검증)
      getTotal().should("have.text", 3);
    });
  });
});
