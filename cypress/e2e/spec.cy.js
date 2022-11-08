import Calculator from "../../src/js/Calculaotr";
import ERROR_MESSAGE from "../../src/const/ERROR_MESSAGE";
import CalculatorView from "../../src/js/CalculatorView";

describe("계산기", () => {
  const calculator = new Calculator();

  describe("두 개의 숫자에 대한 사칙연산", () => {
    before(() => {
      calculator.setPrev(1);
      calculator.setCur(2);
    });
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      calculator.setOperator("+");
      expect(calculator.cal()).to.equal(3);
    });

    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
      calculator.setOperator("-");
      expect(calculator.cal()).to.equal(-1);
    });

    it("2개의 숫자에 대해 곱셉이 가능하다.", () => {
      calculator.setOperator("*");
      expect(calculator.cal()).to.equal(2);
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      calculator.setOperator("/");
      expect(calculator.cal()).to.equal(0);
    });
  });

  describe("2개의 숫자를 받지 않는 경우", () => {
    before(() => {
      calculator.setPrev();
      calculator.setCur(1);
    });
    it("0개의 숫자를 받는 경우 에러를 던진다", () => {
      const actual = () => calculator.cal();
      expect(actual).to.throw(ERROR_MESSAGE.PARAM_MISSING);
    });
    it("1개의 숫자만 받는 경우 에러를 던진다", () => {
      const actual = () => calculator.cal();
      expect(actual).to.throw(ERROR_MESSAGE.PARAM_MISSING);
    });
  });
});

describe("계산기 UI", () => {
  const calculator = new Calculator();
  const calculatorDiv = document.createElement("div");
  calculatorDiv.setAttribute("id", "calculator");
  const calculatorView = new CalculatorView(calculator, calculatorDiv);

  it("4자리 이상의 숫자를 입력한 경우 에러를 던진다", () => {
    const actual = () => calculatorView.updateNumber("1234");
    expect(actual).to.throw(ERROR_MESSAGE.WRONG_NUMINPUT);
  });

  it("숫자를 입력하지 않은 경우 에러를 던진다", () => {
    const actual = () => calculatorView.updateNumber("");
    expect(actual).to.throw(ERROR_MESSAGE.WRONG_NUMINPUT);
  });

  it("1자리 이상 3자리 이하의 숫자를 입력받는다.", () => {
    expect(calculatorView.updateNumber("1")).to.equal(1);
    expect(calculatorView.updateNumber("12")).to.equal(12);
    expect(calculatorView.updateNumber("123")).to.equal(123);
  });

  it("덧셈, 뺄셈, 나눗셈, 곱셈 연산자를 입력받는다", () => {
    expect(calculatorView.updateOperator("+")).to.equal("+");
    expect(calculatorView.updateOperator("-")).to.equal("-");
    expect(calculatorView.updateOperator("*")).to.equal("*");
    expect(calculatorView.updateOperator("/")).to.equal("/");
  });

  it("두 개의 숫자와 1개의 연산자를 입력받아 계산한 결과값을 보여준다.", () => {
    calculatorView.updateNumber("1");
    calculatorView.updateNumber("2");
    calculatorView.updateOperator("+");

    expect(calculatorView.updateResult()).to.equal(calculator.cal());

    calculatorView.updateOperator("-");
    expect(calculatorView.updateResult()).to.equal(calculator.cal());

    calculatorView.updateOperator("*");
    expect(calculatorView.updateResult()).to.equal(calculator.cal());

    calculatorView.updateOperator("/");
    expect(calculatorView.updateResult()).to.equal(calculator.cal());
  });
});
