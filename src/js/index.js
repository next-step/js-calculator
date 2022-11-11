import { getSelector } from './../utils';
import { select } from './../constant';
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

 handelClick(e) {
  if (!e.target) return;
  const target = e.target;
  const classList = target.classList;
  if (classList.length !== 1) {
   return;
  }

  const targetText = target.textContent;
  if (classList.contains(select.OPERATION)) {
   const nextNum = this.number.getNumber();
   if (targetText === '=' && this.operationFn) {
    const newNum = this.operationFn(nextNum);
    console.log(newNum);
    this.number = new Digit(newNum.toString());
    this.dom.print(newNum);
    return;
   }

   this.operationFn = new Calculate(nextNum).getOperator(targetText);

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
const $root = document.querySelector('.calculator');

new App($root).init();
