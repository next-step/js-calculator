import Operator from "../../Abstract/Operator.js";

class Multiply extends Operator {
  constructor(first, second) {
    super(first, second)
  }
  
  calculate() {
    return (Number(this.first) * Number(this.second))
  }
};

export default Multiply;