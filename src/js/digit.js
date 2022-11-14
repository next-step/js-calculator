export default class Digit {
 #totalNumber;
 constructor(stringNumber = '') {
  const digitNumber = stringNumber.split('.');
  this.#totalNumber = digitNumber[0] || '';
 }
 set appendNumber(stringNumber) {
  const numberUnitLimit = 3;
  if (this.#totalNumber.length >= numberUnitLimit) return;
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
