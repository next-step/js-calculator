function Model() {
  this.operands = [];
  this.operators = [];
}

Model.prototype.addOperand = function (operand) {
  const index = this.operators.length;
  let lastOperand = this.operands[index] || '';

  this.operands[index] = +(String(lastOperand) + String(operand));
};

Model.prototype.addOperator = function (operator) {
  this.operators[this.operands.length - 1] = operator;
};

Model.prototype.resetData = function () {
  this.operands = [];
  this.operators = [];
};

export default Model;
