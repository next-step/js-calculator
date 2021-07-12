import { INPUT_OPERATION_WITHOUT_NUMBER_ERROR, MAX_LENGTH_NUMBERS_EXCEEDED_ERROR } from '../constants/Messege.js';
import {DISPLAY, OPERATOR_OBJ, OPERATOR_ARR, MAX_NUMBERS_LENGTH} from '../constants/constants.js';

export default class OperatorInput {
  isValid() {
    this.currentValue = DISPLAY.innerText;
    const lastIndex = this.currentValue.length - 1;
    const lastChar = this.currentValue[lastIndex];

    return !isNaN(lastChar) && this.currentValue !== '0';
  }

  alertError() {
    if (this.isValid()) return;
    alert(INPUT_OPERATION_WITHOUT_NUMBER_ERROR);
  }

  input(operator) {
    if (!this.isValid()) {
      this.alertError();
      return;
    }
    DISPLAY.innerText += operator;
  }
}
