import Component from "../Component.js";
import Operation from "./Operation.js";


class Equal extends Component {
  constructor(target) {
    super(target)
    this.render() 
  }


  render() {
    
    if (isNaN(Number(this.state.textContent))) {
      const operator = [...this.state.textContent].filter(e => isNaN(Number(e)))[0]
      const [first, second] = this.state.textContent.split(operator)
      
      if (operator === "+") {
        this.state.textContent = Operation.plus(first, second)
      }

      if (operator === "-") {
        this.state.textContent = Operation.minus(first, second)
      }

      if (operator === "X") {
        this.state.textContent = Operation.multiply(first, second)
      }

      if (operator === "/") {
        this.state.textContent = Operation.division(first, second)
      }

    } else {
      alert('다른 연산자를 입력해주세요 :)')
    }
  }
};

export default Equal;