import { operation } from '../constant';

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

 getOperator(operator) {
  switch (operator) {
   case operation.PULS:
    return this.plus();
   case operation.MINUS:
    return this.minus();
   case operation.DIVIDE:
    return this.divide();
   case operation.MULTIPLE:
    return this.multiple();
  }
 }
}
