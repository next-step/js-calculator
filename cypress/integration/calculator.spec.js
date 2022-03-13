import constant from "../../src/js/constant.js";
const BASE_URL = "http://localhost:5500";

const clickDigit = digit => cy.get(".digit").contains(digit).click();
const clickOperator = operator =>
  cy.get(".operation").contains(operator).click();
const clickAC = () => cy.get(".modifier").click();
const checkTotal = total => cy.get("#total").should("have.text", total);

describe("계산기 테스트", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("연산이 가능하다.", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      clickDigit(1);
      clickDigit(0);
      clickOperator("+");
      clickDigit(1);
      clickDigit(1);
      clickOperator("=");
      checkTotal(21);
    });

    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
      clickDigit(2);
      clickDigit(2);
      clickOperator("-");
      clickDigit(1);
      clickDigit(1);
      clickOperator("=");
      checkTotal(11);
    });

    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
      clickDigit(1);
      clickDigit(0);
      clickOperator("X");
      clickDigit(1);
      clickDigit(0);
      clickOperator("=");
      checkTotal(100);
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      clickDigit(3);
      clickDigit(0);
      clickOperator("/");
      clickDigit(1);
      clickDigit(0);
      clickOperator("=");
      checkTotal(3);
    });
  });

  describe("초기화가 가능하다", () => {
    it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
      clickAC();
      checkTotal(0);
    });
  });

  describe("입력을 테스트 한다", () => {
    it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
      clickDigit(1);
      clickDigit(2);
      clickDigit(3);
      checkTotal(123);
    });

    describe("정해진 형식으로 결과를 보여준다.", () => {
      it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
        clickDigit(9);
        clickOperator("/");
        clickDigit(6);
        clickOperator("=");
        checkTotal(1);
      });
    });

    // it("3자리 수 이상이 입력되면 에러가 발생한다.", () => {
    //   const { MESSAGE } = constant;
    //   const alertStub = cy.stub();
    //   cy.on("window:alert", alertStub);
    //   clickDigit(1);
    //   clickDigit(2);
    //   clickDigit(3);
    //   clickDigit(3).then(() => {
    //     expect(alertStub).to.be.calledWith(MESSAGE.OPERAND_LENGTH);
    //   });
    // });
  });
});
