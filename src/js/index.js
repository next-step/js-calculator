import { getSelector } from './../utils';
import { select } from './../constant';
import Digit from './digit';
import Dom from './dom';

export default class App {
 constructor($root) {
  this.dom = new Dom($root, getSelector(select.TOTAL, 'id'));
  this.number = new Digit();
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
  if (classList.contains(select.DIGIT)) {
   this.number.setNumber(targetText);
   this.dom.print(this.number.getNumber());
   return;
  }

  if (classList.contains(select.OPERATION)) {
   //
   console.log(targetText);
   return;
  }
 }
}
const $root = document.querySelector('.calculator');

new App($root).init();
