import { getSelector } from './../utils';
import { operation, select } from './../constant';
import Digit from './digit';
import Dom from './dom';
import Calculate from './calculate';
import './../css/index.css';
export default class App {
 constructor($root) {
  this.dom = new Dom($root, getSelector(select.TOTAL, 'id'));
  this.digit = new Digit();
  this.operationFn = null;
 }

 init() {
  this.dom.setClickEvent(this.handelClick.bind(this));
 }

 handleEq() {
  if (!this.operationFn) return;
  const newNum = this.operationFn(this.digit.getNumber);

  this.digit = new Digit(newNum.toString());
  this.dom.print(this.digit.getNumber);
  this.operationFn = null;
 }

 handelClick(e) {
  if (!e.target) return;
  const target = e.target;
  const buttonType = target.dataset.button;

  const operator = target.textContent;

  if (buttonType === select.OPERATION) {
   if (operator === operation.EQ) {
    this.handleEq();
    return;
   }
   this.operationFn = new Calculate(this.digit.getNumber).getOperator(operator);

   this.digit.reset();
   return;
  }

  if (buttonType === select.DIGIT) {
   this.digit.appendNumber = operator;
  }

  if (buttonType === select.RESET) {
   this.digit.reset();
  }
  this.dom.print(this.digit.getNumber);
 }
}
const $root = document.querySelector(getSelector(select.CALCULATOR, 'class'));

new App($root).init();
