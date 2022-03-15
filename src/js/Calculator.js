import { $, calculate } from './utils.js';
import { OPERATOR } from './constants.js';
import { isOverMaxNumber,isOverlapOperator,isEnterFirstInputOperator } from './validation.js';

export default function Calculator() {
  let num1 = '';
  let num2 = '';
  let operator = null;

  const $total = $('#total');
  const $modifier = $('.modifiers');
  const $digits = $('.digits');
  const $operations = $('.operations');

  this.init = () => {
    setEvents();
  }

  const setEvents= () =>{
    $digits.addEventListener('click', clickDigits);
    $operations.addEventListener('click', clickOperators);
    $modifier.addEventListener('click', clickModifier);
  }

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

  const clickModifier = () => {
    resetData();
    resetTotal();
  };

  const resetData = () => {
    num1 = '';
    num2 = '';
    operator = null;
  };

  const resetTotal = () => {
    $total.textContent = '0';
  };

  const showResult = (value) => {
    $total.textContent = String(value);
    num1 = $total.textContent;
  };

  const firstClickDigit = () => {
    $total.textContent = '';
  };

  const showTotal = (value) => {
    $total.textContent += String(value);
  };

  const nextCalculation = (clikckOperator) => {
      showTotal(clikckOperator)
      operator = clikckOperator;
  }
}
