import { ERR_MESSAGE, INPUT_TYPE, MAX_LENGTH } from '../utils/constants.js';
import { eventDataGetter } from '../utils/dataConvert.js';
import { calcOperation } from '../utils/operation.js';

class OperandModel {
  constructor(type = INPUT_TYPE.DIGIT, value = '') {
    this.type = type;
    this.value = value;
  }

  updateValue(value) {
    this.value += value;
  }
}

export default class CalculatorModel {
  #observers;
  #operandStack;
  #operand;

  constructor() {
    this.#observers = [];
    this.init();
  }

  validator = {
    isValidOperandLength: () => {
      return this.#operand.value.length < MAX_LENGTH;
    },
    isValidFirstOperand: () => {
      return !!this.firstOperand?.value;
    },
  };

  eventHandler = {
    DIGIT: e => {
      if (!this.validator.isValidOperandLength())
        return alert(ERR_MESSAGE.OVER_NUMBER);

      const operandValue = eventDataGetter(e);

      this.#operand.type = INPUT_TYPE.DIGIT;
      this.#operand.updateValue(operandValue);

      this.updateOperandStack(this.#operand);
      this.notifyObservers();
    },

    MODIFIER: () => {
      this.init();
      this.notifyObservers();
    },

    OPERATION: e => {
      const operation = eventDataGetter(e);
      if (!this.validator.isValidFirstOperand())
        return alert(ERR_MESSAGE.NONE_NUMBER);

      if (operation === '=') return this.calculate();

      this.updateOperation(operation);
      this.#operand = new OperandModel(INPUT_TYPE.OPERATION, '');
      this.notifyObservers();
    },
  };

  init() {
    this.#operandStack = Array(3);
    this.#operand = new OperandModel();
  }

  addObserver = observer => {
    this.#observers.push(observer);
  };

  notifyObservers = () => {
    for (const observer of this.#observers) {
      observer.update(this);
    }
  };

  calculate() {
    const operate = calcOperation(
      this.firstOperand.value,
      this.secondOperand.value
    );

    const operatedResult = operate[this.selectedOperation.value]();
    const firstOperand = new OperandModel(INPUT_TYPE.DIGIT, operatedResult);

    this.#operandStack = Array(3).fill(firstOperand, 0, 1);
    this.#operand = new OperandModel(INPUT_TYPE.DIGIT, '');

    this.notifyObservers();
  }

  updateOperation(operation) {
    this.#operandStack[1] = new OperandModel(INPUT_TYPE.DIGIT, operation);
  }

  updateOperandStack() {
    if (!this.selectedOperation) {
      this.#operandStack[0] = this.#operand;
    } else {
      this.#operandStack[2] = this.#operand;
    }
  }

  get firstOperand() {
    return this.#operandStack[0];
  }

  get selectedOperation() {
    return this.#operandStack[1];
  }

  get secondOperand() {
    return this.#operandStack[2];
  }

  get totalInputToString() {
    return this.#operandStack.map(o => o.value).join('');
  }
}
