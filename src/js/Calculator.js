import { $, calculate } from './utils.js';
import { OPERATOR } from './constants.js';
import { isOverMaxNumber } from './validation.js';

export default class Calculator {
  constructor() {
    this.num1 = '';
    this.num2 = '';
    this.operator = null;

    this.$total = $('#total');
    this.$modifier = $('.modifiers');
    this.$digits = $('.digits');
    this.$operations = $('.operations');
  }

  init() {
    this.setEvents();
  }

  setEvents() {
    this.$digits.addEventListener('click', this.clickDigits);
    this.$operations.addEventListener('click', this.clickOperators);
    this.$modifier.addEventListener('click', this.clickModifier);
  }

  clickDigits = (e) => {
  const clickDigits = (e) => {
    const digit = e.target.textContent;

    const getDigit = (num) => {
      if (isOverMaxNumber(num)) return 0

      showTotal(digit)
      return digit
    }

    if (!num1) firstClickDigit();

    if(operator) {
      num2 += getDigit(num2)
      return
    } 
    num1 += getDigit(num1)
  };

  const clickOperators = (e) => {
    const clikckOperator = e.target.textContent;

    if (num1 && num2 && operator) {
      const result = calculate(num1, num2, operator);
      showResult(result);
      num2 = '';
      operator = null;
      if(clikckOperator !== OPERATOR.EQUAL) nextCalculation(clikckOperator)
      
      return
    }

    if(isEnterFirstInputOperator(num1)) return
    if(isOverlapOperator(num2,operator,clikckOperator)) return
    
    
    operator = clikckOperator;
    $total.textContent += clikckOperator;
  };

  clickModifier = () => {
    this.resetData();
    this.resetTotal();
  };

  resetData = () => {
    this.num1 = '';
    this.num2 = '';
    this.operator = null;
  };

  resetTotal = () => {
    this.$total.textContent = '0';
  };

  showResult = (value) => {
    this.$total.textContent = String(value);
  };

  firstClickDigit = () => {
    this.$total.textContent = '';
  };

  showTotal = (value) => {
    this.$total.textContent += String(value);
  };
}
