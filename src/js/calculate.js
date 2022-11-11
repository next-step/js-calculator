import { operator } from '../constant';

export default class Calculate {
 constructor(number) {
  this.number = number;
 }
 plus() {
  return (nextNumber) => this.number + nextNumber;
 }

 minus() {
  return (nextNumber) => this.number - nextNumber;
 }

 multiple() {
  return (nextNumber) => this.number * nextNumber;
 }

 divide() {
  return (nextNumber) => this.number / nextNumber;
 }

 getOperator(operation) {
  switch (operation) {
   case operator.PULS:
    return this.plus();
   case operator.MINUS:
    return this.minus();
   case operator.DIVIDE:
    return this.divide();
   case operator.MULTIPLE:
    return this.multiple();
  }
 }
}
