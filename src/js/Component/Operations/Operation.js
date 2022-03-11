import Component from "../Component.js";
import Equal from "./Equal.js";
import Plus from "./Plus.js";

class Operation extends Component{
  constructor(target) {
    super(target)
    this.checkOperator()
  }
  
  checkOperator() {
    if (this.target.textContent === "+") new Plus(this.target)

    if (this.target.textContent === "=") new Equal(this.target)
  }

}

export default Operation;