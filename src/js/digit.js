export default class Digit {
 #totalNumber;
 constructor(stringNumber = '') {
  const digitNumber = stringNumber.split('.');
  this.#totalNumber = digitNumber[0] || '';
 }
 set appendNumber(stringNumber) {
  if (this.#totalNumber.length >= 3) return;
  this.#totalNumber += stringNumber;
 }

 get getNumber() {
  if (this.#totalNumber === '') return 0;
  return Number(this.#totalNumber);
 }

 reset() {
  this.#totalNumber = '';
 }
}
