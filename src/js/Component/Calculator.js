import Component from "../Abstract/Component.js";
import Division from "./Operators/Division.js";
import Minus from "./Operators/Minus.js";
import Multiply from "./Operators/Multiply.js";
import Plus from "./Operators/Plus.js";

class Calculator extends Component{
  constructor(target) {
    super(target)
    this.render()
  }
  
  render() {
    this.validateOperator()
  }
  
  validateOperator() {
    const regExp = /[^0-9]/g;
    const isThereOperator = regExp.test(this.state.textContent)
    const isOnlyNumber = !isNaN(Number(this.state.textContent))

    if (isOnlyNumber) {
      return this.target.textContent !== '=' ? this.combineState() : alert('다른 연산자를 입력해주세요 :)');
    }

    if (isThereOperator && this.checkOnlyOneNumber(this.state)) {
      return alert('연산자 연속적으로 누를 수 없습니다!')
    }
    
    if (isThereOperator && this.target.textContent === '=') {
      const calculatedValue = this.checkOperatorAndCalculate(this.state.textContent)
      this.changeState(calculatedValue)
    }
  }

  checkOnlyOneNumber(value) {
    return !isNaN(Number(this.removeLastValue(value))) ? true : false;
  }

  removeLastValue(value) {
    const removeLastValue = [...value.textContent]
    removeLastValue.pop()
    return removeLastValue.join('')
  }

  checkOperatorAndCalculate(state) {
    const operator = [...state].filter(e => isNaN(Number(e)))[0]
    const numbers = state.split(operator)
    
    return this.calculate(operator, numbers)
  }

  calculate(operator, numbers) {
    const [first, second] = numbers

    switch (operator) {
      case '+':
        const plus = new Plus(first, second);
        return plus.calculate()
      case '-':
        const minus = new Minus(first, second);
        return minus.calculate()
      case 'X':
        const multiply = new Multiply(first, second);
        return multiply.calculate()
      case '/':
        const division = new Division(first, second);
        return division.calculate()
    }
  }
}

export default Calculator;