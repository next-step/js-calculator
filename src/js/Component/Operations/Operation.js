import Component from "../Component.js";
import Equal from "./Equal.js";

class Operation extends Component{
  constructor(target) {
    super(target)
    this.checkEqualOperator()
  }
  
  static plus(first, second) {
    return (Number(first) + Number(second))
  }

  static minus(first, second) {
    return (Number(first) - Number(second))
  }
  static multiply(first, second) {
    return (Number(first) * Number(second))
  }
  static division(first, second) {
    return Math.floor(Number(first) / Number(second))
  }

  checkEqualOperator() {
    // 리팩토링
    const isThereOperator = isNaN(Number(this.state.textContent))

    if (isThereOperator) {
      if (this.target.textContent === '=') new Equal(this.target)
    } else {
      if (this.target.textContent !== '=') {
        this.state.textContent += this.target.textContent
      }
    }
  }
}

export default Operation;