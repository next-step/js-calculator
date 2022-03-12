import Component from "../Component.js";
import Operation from "./Operation.js";


class Equal extends Component {
  constructor(target) {
    super(target)
    this.render() 
  }

  checkOperatorAndCalculate() {
    const operator = [...this.state.textContent].filter(e => isNaN(Number(e)))[0]
    const [first, second] = this.state.textContent.split(operator)
      
      if (operator === "+") return Operation.plus(first, second)

      if (operator === "-") return Operation.minus(first, second)

      if (operator === "X") return Operation.multiply(first, second)

      if (operator === "/") return Operation.division(first, second)
  }


  render() {
    const isThereOperator = isNaN(Number(this.state.textContent))

    if (isThereOperator) {
      this.state.textContent = this.checkOperatorAndCalculate()
      return;
    } 

    alert('다른 연산자를 입력해주세요 :)')
  }
};

export default Equal;