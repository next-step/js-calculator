import {DISPLAY, OPERATOR_OBJ, OPERATOR_ARR, MAX_NUMBERS_LENGTH} from '../constants/constants.js';

export default class Calculate{
  calculate() {
    this.currentValue = DISPLAY.innerText;
    const operators = [...this.currentValue].filter(char => OPERATOR_ARR.includes(char)); 
    const numbers = this.currentValue
                    .replace(/\D/g, '#')
                    .split('#')
                    .map(el => Number(el));

    const calculatedValue = numbers.reduce((result, number, index) => {
      if (index === 0) {
        return result + number;
      }
      const currOperator = operators[index-1];
      return OPERATOR_OBJ[currOperator](result, number);
    }, 0);

    DISPLAY.innerText = calculatedValue;
  }
}
