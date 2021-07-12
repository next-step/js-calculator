import { INPUT_OPERATION_WITHOUT_NUMBER_ERROR, MAX_LENGTH_NUMBERS_EXCEEDED_ERROR } from '../constants/Messege.js';
import {DISPLAY, OPERATOR_OBJ, OPERATOR_ARR, MAX_NUMBERS_LENGTH} from '../constants/constants.js';

export default class NumberInput {
  isValid() {
    this.currentValue = DISPLAY.innerText;
    const operators = [...this.currentValue]                                          
                      .filter(char => OPERATOR_ARR.includes(char));
    const lastOperator = operators[operators.length -1]; 
    
    if (operators.length) {
      const splitedValues = this.currentValue.split(lastOperator);
      const lastIndex = splitedValues.length -1;
      return splitedValues[lastIndex].length < MAX_NUMBERS_LENGTH; 
    }

    return this.currentValue.length < MAX_NUMBERS_LENGTH;
  }

  alertError() {
    if(this.isValid()) return;
    alert(MAX_LENGTH_NUMBERS_EXCEEDED_ERROR);
  }

  input(num) {
    this.currentValue = DISPLAY.innerText;
    if (!this.isValid()) {
      this.alertError();
      return;
    }

    if (this.currentValue === '0') {
      DISPLAY.innerText = num;
      return;
    }
    
    DISPLAY.innerText += num;
  }
}

