import Calculator from '../Model/Calculator.js';
import Validator from '../Model/Validator.js';

import { DIGIT, INIT_NUMBER, OPERATION, selector } from '../util/consts.js';
import View from '../View/index.js';

const Controller = (function () {
  let number = INIT_NUMBER;
  let operator;
  let numberContainer = [];

  return {
    digit: {
      seperateDigitProcess(event) {
        const keyPadNumber = event.target.textContent;

        if (Validator.digit.isKeyPadInitState(number)) {
          keyPadNumber !== INIT_NUMBER && this.replace(keyPadNumber);
          return;
        }

        if (Validator.digit.isMoreThanThousand(number)) {
          return new Error(DIGIT.ENTER_MORE_THAN_THOUSAND_ERROR);
        }

        this.merge(keyPadNumber);
      },

      replace(keyPadNumber) {
        number = keyPadNumber;
        View.digit.changeKeyPadView(number);
      },

      merge(keyPadNumber) {
        number += keyPadNumber;
        View.digit.changeKeyPadView(number);
      },
    },
    operation: {
      seperateOperationProcess(event) {
        const keyPadOperation = event.target.textContent;

        if (Validator.operation.pressEqual(keyPadOperation)) {
          this.equal(keyPadOperation);
          return;
        }

        if (Validator.operation.pressInARow(operator)) {
          return new Error(OPERATION.PRESS_IN_A_ROW_ERROR);
        }

        this.resetNumber();

        operator = keyPadOperation;
      },

      equal(keyPadOperation) {
        if (Validator.operation.isNotThereOperator(operator, keyPadOperation)) {
          return new Error(OPERATION.EQUAL_VALIDATION_ERROR);
        }

        numberContainer.push(View.moniter.textContent);

        const [firstNumber, secondNumber] = numberContainer.map(Number);
        switch (operator) {
          case '+':
            View.moniter.textContent = Calculator.add(
              firstNumber,
              secondNumber
            );
            break;
          case '-':
            View.moniter.textContent = Calculator.subtract(
              firstNumber,
              secondNumber
            );
            break;
          case 'X':
            View.moniter.textContent = Calculator.multiply(
              firstNumber,
              secondNumber
            );
            break;
          case '/':
            View.moniter.textContent = Calculator.divide(
              firstNumber,
              secondNumber
            );
            break;
        }

        this.operateOnlyTwoNumber();
      },

      resetNumber() {
        View.digit.changeKeyPadView(INIT_NUMBER);
        numberContainer.push(number);
        number = INIT_NUMBER;
      },

      operateOnlyTwoNumber() {
        number = INIT_NUMBER;
        numberContainer = [];
        operator = '';
      },
    },

    modifier: {
      reset() {
        View.digit.changeKeyPadView(INIT_NUMBER);
        number = INIT_NUMBER;
        operator = '';
      },
    },
  };
})();

export default Controller;
