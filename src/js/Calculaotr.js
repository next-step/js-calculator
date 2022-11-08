import ERROR_MESSAGE from "../const/ERROR_MESSAGE";

export default function Calculator() {
  this.setPrev = function (num) {
    this.prev = num;
  };

  this.setCur = function (num) {
    this.cur = num;
  };

  this.setOperator = function (operator) {
    this.operator = operator;
  };

  this.getPrev = function () {
    return this.prev;
  };

  this.getCur = function () {
    return this.cur;
  };

  this.getOperator = function () {
    return this.operator;
  };

  this.cal = function () {
    if (
      this.prev == null ||
      this.prev == "undefined" ||
      this.cur == null ||
      this.prev == "undefined"
    )
      throw new Error(ERROR_MESSAGE.PARAM_MISSING);

    if (this.operator == "+") {
      return this.sum();
    } else if (this.operator == "-") {
      return this.abstract();
    } else if (this.operator == "*") {
      return this.multiply();
    } else if (this.operator == "/") {
      return this.divide();
    }
  };

  this.sum = function () {
    return this.getPrev() + this.getCur();
  };
  this.abstract = function () {
    return this.getPrev() - this.getCur();
  };

  this.multiply = function () {
    return this.getPrev() * this.getCur();
  };

  this.divide = function () {
    return Math.floor(this.getPrev() / this.getCur());
  };
}
