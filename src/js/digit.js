export default class Digit {
 constructor(stringNumber = '') {
  const digitNumber = stringNumber.split('.');
  this.totalNumber = digitNumber[0] || '';
 }

 setNumber(stringNumber) {
  if (this.totalNumber.length >= 3) return;
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
