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
   case '+':
    return this.plus();
   case '-':
    return this.minus();
   case '/':
    return this.divide();
   case 'X':
    return this.multiple();
  }
 }
}
