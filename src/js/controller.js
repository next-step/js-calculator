import Model from './model.js';
import View from './view.js';
import { EVENT_TYPE, OPERATOR } from './constants/index.js';
import { validateDigit, validateOperator, calculateData } from './utils.js';

function Controller() {
  this.model = new Model();
  this.view = new View();
}

Controller.prototype.init = function () {
  this.addEventListener(
    this.view.$digits,
    EVENT_TYPE.CLICK,
    this.addOperands.bind(this)
  );
  this.addEventListener(
    this.view.$operators,
    EVENT_TYPE.CLICK,
    this.addOperator.bind(this)
  );
  this.addEventListener(
    this.view.$modifier,
    EVENT_TYPE.CLICK,
    this.reset.bind(this)
  );
};

Controller.prototype.addEventListener = function (target, eventType, callback) {
  target.addEventListener(eventType, callback);
};

Controller.prototype.addOperands = function (e) {
  const digit = +e.target.textContent;

  const { operands, operators } = this.model;

  const isValid = validateDigit(operands, operators);
  if (!isValid) return;

  this.model.addOperand(digit);
  this.view.render(digit);
};

Controller.prototype.addOperator = function (e) {
  const operator = e.target.textContent;

  if (operator === OPERATOR.EQUAL) {
    this.executeCalculation();
    return;
  }

  const { operands, operators } = this.model;

  const isValid = validateOperator(operands, operators);
  if (!isValid) return;

  this.model.addOperator(operator);
  this.view.render(operator);
};

Controller.prototype.executeCalculation = function () {
  const result = calculateData(this.model.operands, this.model.operators);
  this.model.resetData();
  this.model.addOperand(result);
  this.view.renderResult(result);
};

Controller.prototype.reset = function () {
  this.model.resetData();
  this.view.resetTotal();
};

export default Controller;
