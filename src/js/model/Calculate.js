import { Operator } from "../Operator";

export default class CalculateCore {
  #operator;

  constructor() {
    this.#operator = new Operator();
  }

  calculate(inputs) {
    const { prevSum: total } = inputs.reduce(
      (acc, curr) => {
        const parsedValue = parseInt(curr, 10);

        if (this.#operator.isOperator(curr)) {
          acc.operator = curr;
          return acc;
        }

        if (acc.prevSum === null) {
          acc.prevSum = parsedValue;
          return acc;
        }

        if (acc.operator) {
          acc.prevSum = this.#operator.execute(
            acc.operator,
            acc.prevSum,
            parsedValue
          );
          return acc;
        }
        acc.prevSum = acc.prevSum * 10 + parsedValue;
        return acc;
      },
      { prevSum: null, operator: null }
    );

    return Math.floor(total);
  }
}
