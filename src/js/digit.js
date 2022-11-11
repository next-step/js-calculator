export default class Digit {
 constructor(stringNumber = '') {
  this.totalNumber = stringNumber || '';
 }

 setNumber(stringNumber) {
  console.log(stringNumber);
  this.totalNumber += stringNumber;
 }

 getNumber() {
  if (this.totalNumber === '') return 0;
  return Number(this.totalNumber);
 }

 reset() {
  this.totalNumber = '';
 }
}
