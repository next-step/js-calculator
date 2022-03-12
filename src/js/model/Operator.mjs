import {OPERATOR_SYMBOL} from "../constants.mjs";

class AddCommand {
  #symbol = OPERATOR_SYMBOL.PLUS;

  get symbol() {
    return this.#symbol;
  }

  execute(num1, num2) {
    return num1 + num2;
  }
}

class SubCommand {
  #symbol = OPERATOR_SYMBOL.MINUS;

  get symbol() {
    return this.#symbol;
  }

  execute(num1, num2) {
    return num1 - num2;
  }
}

class MultiplyCommand {
  #symbol = OPERATOR_SYMBOL.MULTIPLY;

  get symbol() {
    return this.#symbol;
  }

  execute(num1, num2) {
    return num1 * num2;
  }
}

class DivideCommand {
  #symbol = OPERATOR_SYMBOL.DIVIDE;

  get symbol() {
    return this.#symbol;
  }

  execute(num1, num2) {
    return num1 / num2;
  }
}

export class Operator {
  constructor() {
    this.operators = [
      AddCommand,
      SubCommand,
      MultiplyCommand,
      DivideCommand,
    ].reduce((acc, Command) => {
      const command = new Command();

      acc[command.symbol] = command;
      return acc;
    }, {});
    this.operatorSymbols = Object.keys(this.operators);
  }

  execute(oper, num1, num2) {
    return this.operators[oper].execute(num1, num2);
  }

  /**
   *
   * @param {'+' | '-' | '*' | '/'} str
   * @returns {boolean}
   */
  isOperator = (str) => this.operatorSymbols.includes(str);
}
