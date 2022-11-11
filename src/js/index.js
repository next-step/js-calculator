import { getSelector } from './../utils';
import { operator, select } from './../constant';
import Digit from './digit';
import Dom from './dom';
import Calculate from './calculate';

export default class App {
 constructor($root) {
  this.dom = new Dom($root, getSelector(select.TOTAL, 'id'));
  this.number = new Digit();
  this.operationFn = null;
 }

 init() {
  this.dom.setClickEvent(this.handelClick.bind(this));
 }

 handleEq() {
  if (!this.operationFn) return;
  const newNum = this.operationFn(this.number.getNumber());

  this.number = new Digit(newNum.toString());
  this.dom.print(this.number.getNumber());
  this.operationFn = null;
 }

 handelClick(e) {
  if (!e.target) return;
  const target = e.target;
  const classList = target.classList;
  if (classList.length !== 1) {
   return;
  }

  const targetText = target.textContent;

  if (classList.contains(select.OPERATION)) {
   if (targetText === operator.EQ) {
    this.handleEq();
    return;
   }
   this.operationFn = new Calculate(this.number.getNumber()).getOperator(
    targetText
   );

   this.number.reset();
   return;
  }

  if (classList.contains(select.DIGIT)) {
   this.number.setNumber(targetText);
  }

  if (classList.contains(select.MODIFIER)) {
   this.number.reset();
  }
  this.dom.print(this.number.getNumber());
 }
}
const $root = document.querySelector(getSelector(select.CALCULATOR, 'class'));

new App($root).init();
