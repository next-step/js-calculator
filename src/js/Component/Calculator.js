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
    this.checkValidateAndCalculate()
  }
  // 렌더링 쪽만 관여 (여기는 무조건 연산자 버튼을 눌렀을 때임)
  checkValidateAndCalculate() {
    const regExp = /[^0-9]/g;
    const isThereOperator = regExp.test(this.state.textContent)

    // 숫자만 있을 때 = 오면 안됨
    if (!isNaN(Number(this.state.textContent))) {
      return this.target.textContent !== '=' ? this.combineState() : alert('다른 연산자를 입력해주세요 :)');
    }

    // 연산자가 연속으로 올 때 앞에 숫자가 하나인 상황
    if (isThereOperator && this.checkOnlyOneNumber(this.state)) {
      return alert('연산자 연속적으로 누를 수 없습니다!')
    }
    
    // 계산하기
    if (isThereOperator && this.target.textContent === '=') {
      const answer = this.checkOperator(this.state)
      this.changeState(answer)
    }
  }

  checkOnlyOneNumber(value) {
    const checkOnlyNumber = [...value.textContent]
    checkOnlyNumber.pop()
    return !isNaN(Number(checkOnlyNumber.join(''))) ? true : false;
  }

  checkOperator(state) {
    const operator = [...state.textContent].filter(e => isNaN(Number(e)))[0]
    const [first, second] = state.textContent.split(operator)
      
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