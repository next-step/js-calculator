import { select } from './../constant';
import Dom from './dom';

export default class App {
 constructor($root) {
  this.dom = new Dom($root, select.TOTAL);
 }

 init() {
  this.dom.setClickEvent(this.handelClick);
 }

 handelClick(e) {
  if (!e.target) return;
  const classList = e.target.classList;
  console.log(classList);
 }
}
const dom = document.querySelector('.calculator');

new App(dom).init();
