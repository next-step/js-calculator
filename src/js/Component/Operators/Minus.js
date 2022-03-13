import Operator from "../../Abstract/Operator.js";

class Minus extends Operator {
  constructor(first, second) {
    super(first, second)
  }

  calculate() {
    return (Number(this.first) - Number(this.second))
  }
};

export default Minus;