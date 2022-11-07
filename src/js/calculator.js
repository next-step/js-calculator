import { operations } from './operation.js';

class Calculator {
  constructor() {
    this.operator = '';
    this.inputs = [];
    this.result = 0;
  }

  calculate() {
    const operator = this.operator;
    const operatorIndex = this.inputs.indexOf(operator);
    const num1 = this.inputs.slice(0, operatorIndex).join('');
    const num2 = this.inputs.slice(operatorIndex + 1).join('');
    const convertedNum1 = Number(num1);
    const convertedNum2 = Number(num2);
    const result = operations[operator](convertedNum1, convertedNum2);
    this.result = result;
    this.inputs = [result];
    this.operator = '';
  }

  setInputs(inputValues) {
    this.inputs.push(inputValues);
  }

  setOperator(operator) {
    this.operator = operator;
  }

  reset() {
    this.operator = '';
    this.inputs = [];
    this.result = 0;
  }
}

export default Calculator;
