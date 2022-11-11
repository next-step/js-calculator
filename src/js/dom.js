export default class Dom {
 constructor($root, printSelector) {
  this.$root = $root;
  this.total = $root.querySelector(printSelector);
 }

 setClickEvent(fn) {
  this.$root.addEventListener('click', fn);
 }

 print(string) {
  this.total.textContent = string;
 }
}
