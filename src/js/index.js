import { getSelector } from './../utils';
import { OPERATION_CONST, SELECT_CONST } from './../constant';
import Digit from './digit';
import Dom from './dom';
import './../css/index.css';
import operators from './operators';

export default class App {
 constructor($root) {
  this.dom = new Dom($root, getSelector(SELECT_CONST.TOTAL, 'id'));
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

  if (buttonType === SELECT_CONST.OPERATION) {
   if (operator === OPERATION_CONST.EQ) {
    this.handleEq();
    return;
   }
   const operation = operators[operator];
   const prevNumber = this.digit.getNumber;
   this.operationFn = operation(prevNumber);

   this.digit.reset();
   return;
  }

  if (buttonType === SELECT_CONST.DIGIT) {
   this.digit.appendNumber = operator;
  }

  if (buttonType === SELECT_CONST.RESET) {
   this.digit.reset();
  }
  this.dom.print(this.digit.getNumber);
 }
}
const $root = document.querySelector(
 getSelector(SELECT_CONST.CALCULATOR, 'class')
);

new App($root).init();
