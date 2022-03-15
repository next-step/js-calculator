import Operator from "../../Abstract/Operator.js";

class Division extends Operator {
  constructor(first, second) {
    super(first, second)
  }

  calculate() {
    return Math.floor(Number(this.first) / Number(this.second))
  }
};

export default Division;
