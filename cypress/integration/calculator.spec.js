import { MESSAGE } from "../../src/js/constant/index.js";
const BASE_URL = "http://localhost:5500";

const clickDigit = digit => cy.get(".digit").contains(digit).click();
const clickOperator = operator =>
  cy.get(".operation").contains(operator).click();
const clickAC = () => cy.get(".modifier").click();
const checkTotal = total => cy.get("#total").should("have.text", total);

const calculateTwoNumbers = ({ numbers, total, operator }) => {
  const LEFT_OPERAND_END_INDEX = 1;
  const RIGHT_OPERAND_END_INDEX = 3;

  numbers.forEach((number, idx) => {
    clickDigit(number);

    if (idx === LEFT_OPERAND_END_INDEX) clickOperator(operator);

    if (idx === RIGHT_OPERAND_END_INDEX) clickOperator("=");
  });

  checkTotal(total);
};

const repeatNumberClick = numbers => {
  numbers.forEach(number => clickDigit(number));
};

describe("계산기 테스트", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("연산이 가능하다.", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      calculateTwoNumbers({ numbers: [1, 0, 1, 1], total: 21, operator: "+" });
    });

    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
      calculateTwoNumbers({ numbers: [2, 2, 1, 1], total: 11, operator: "-" });
    });

    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
      calculateTwoNumbers({ numbers: [1, 0, 1, 0], total: 100, operator: "X" });
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      calculateTwoNumbers({ numbers: [3, 0, 1, 0], total: 3, operator: "/" });
    });
  });

  describe("초기화가 가능하다.", () => {
    it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
      clickAC();
      checkTotal(0);
    });
  });

  describe("입력을 테스트 한다.", () => {
    it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
      repeatNumberClick([1, 2, 3]);
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

    it("3자리 수 이상이 입력되면 에러가 발생한다.", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      repeatNumberClick([1, 2, 3]);

      clickDigit(2).then(() => {
        expect(alertStub).to.be.calledWith(MESSAGE.OPERAND_LENGTH);
      });
    });
  });
});
