import { Calculator, INITIAL_STATE } from "../calculator.js";
import { Sum } from "../utils/operations.js";

describe("Calculator", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calculator">
        <div id="total">0</div>
      </div>
    `;
  });

  const initializeCalculator = () => {
    return new Calculator(document.querySelector("#calculator"));
  };

  const getTotalEl = () => {
    return document.querySelector("#total");
  };

  test("Initialize calculator", () => {
    const calculator = initializeCalculator();
    Object.keys(calculator.state).forEach((key) => {
      expect(calculator.state[key]).toBe(INITIAL_STATE[key]);
    });
  });

  test("Set term", () => {
    const calculator = initializeCalculator();
    calculator.setTerm("firstTerm", 1);
    expect(calculator.state.firstTerm).toBe(1);
    expect(getTotalEl().innerText).toBe("1");

    calculator.setTerm("firstTerm", 2);
    expect(calculator.state.firstTerm).toBe(12);
    expect(getTotalEl().innerText).toBe("12");

    calculator.setTerm("firstTerm", 3);
    expect(calculator.state.firstTerm).toBe(123);
    expect(getTotalEl().innerText).toBe("123");

    expect(() => calculator.setTerm("firstTerm", 5)).toThrow();
  });

  test("Set operation", () => {
    const calculator = initializeCalculator();
    calculator.setOperation("+");
    expect(calculator.state.operation).toStrictEqual(new Sum());

    calculator.setOperation("=");
    expect(calculator.state.operation).toBe(undefined);

    expect(() => calculator.setOperation("operation")).toThrow();
  });

  test("calculate", () => {});

  test("Reset calculator", () => {
    const calculator = initializeCalculator();
    calculator.setState("firstTerm", 10);
    calculator.setState("secondTerm", 10);
    calculator.clear();
    Object.keys(calculator.state).forEach((key) => {
      expect(calculator.state[key]).toBe(INITIAL_STATE[key]);
    });
    expect(getTotalEl().innerText).toBe("0");
  });
});
