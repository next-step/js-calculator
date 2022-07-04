import { getOperations } from "./operations.js";

export const INITIAL_STATE = {
  operation: undefined,
  firstTerm: undefined,
  secondTerm: undefined,
};

export class Calculator {
  state = { ...INITIAL_STATE };

  constructor($app) {
    this.$app = $app;
  }

  get total() {
    return this.$app.querySelector("#total");
  }

  setState(key, value) {
    if (this.state.hasOwnProperty(key)) {
      this.state[key] = value;
      this.render();
    } else {
      throw new Error("Invalid state key");
    }
  }

  get result() {
    const { firstTerm = "", secondTerm = "", operation = "" } = this.state;
    return Number(`${firstTerm}${operation}${secondTerm}`).toString();
  }

  render = () => {
    this.total.innerText = this.result;
  };

  appendTerm = (key, value) => {
    const nextTerm = `${this.state[key]}`.concat(value);
    if (nextTerm.length > 3) throw new Error("3자리 수 이상은 입력할 수 없습니다.");
    else this.setState(key, Number(nextTerm));
  };

  setTerm = (key, value) => {
    const currentTerm = this.state[key];
    if (value === undefined) {
      this.setState(key, undefined);
      return;
    }
    if (currentTerm === undefined) {
      this.setState(key, Number(value));
    } else {
      this.appendTerm(key, value);
    }
  };

  setFirstTerm = (value) => {
    this.setTerm("firstTerm", value);
  };

  setSecondTerm = (value) => {
    this.setTerm("secondTerm", value);
  };

  setOperation = (operator) => {
    if (operator === "=") {
      this.calculate();
    } else {
      const operation = getOperations(operator);
      if (!operation) throw new Error("Invalid operation");
      this.setState("operation", operation);
    }
  };

  calculate = () => {
    const { operation, firstTerm, secondTerm } = this.state;
    if (secondTerm === undefined) {
      this.setState("operation", undefined);
    } else {
      const total = operation.operate(firstTerm, secondTerm);
      this.state = { ...INITIAL_STATE };
      this.setState("firstTerm", total);
    }
  };

  clear = () => {
    this.state = { ...INITIAL_STATE };
    this.render();
  };
}
