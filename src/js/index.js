import { add, subtract, multiply, divide } from './util/operators.js';
import { compute } from './util/compose.js';
import {
  LIMITED_PLACE_VALUE,
  LIMITED_DECIMAL_POINT,
  checkLimitNumber,
  isFalsyEnteredNumber,
  isEnterFromZeroToZero,
} from './util/validate.js';

const op = {
  '+': add,
  '-': subtract,
  X: multiply,
  '/': divide,
};

const total = document.getElementById('total');
const numbers = document.getElementsByClassName('digits');
const operations = document.getElementsByClassName('operations');
const allClears = document.getElementsByClassName('modifier');

const arrayToPlainText = (inputArray, defaultValue = '') =>
  inputArray.reduce((before, next) => before + next, defaultValue);

let enteredArray = [];
let cursor = 0;

for (let number of numbers) {
  number.addEventListener('click', (e) => {
    if (isEnterFromZeroToZero(+e.target.innerHTML, +enteredArray[cursor])) {
      return;
    }
    enteredArray[cursor] = checkLimitNumber(
      enteredArray[cursor],
      e.target.innerHTML,
      LIMITED_PLACE_VALUE,
      () => alert('3자리 숫자만 입력 가능합니다.')
    );
    total.innerHTML = arrayToPlainText(enteredArray);
  });
}

for (let operation of operations) {
  operation.addEventListener('click', (e) => {
    if (e.target.innerHTML === '=') {
      if (isFalsyEnteredNumber(enteredArray[cursor])) {
        enteredArray = [enteredArray[0] || '0'];
        cursor = 0;
        return (total.innerHTML = enteredArray[0]);
      }

      enteredArray = [
        '' +
          compute(+enteredArray[0])(op[enteredArray[1]])(
            +enteredArray[2]
          ).toFixed(LIMITED_DECIMAL_POINT),
      ];

      cursor = 0;
    } else {
      if (isFalsyEnteredNumber(enteredArray[cursor])) {
        return alert('숫자를 먼저 입력하고 연산자를 입력해 주세요');
      }

      cursor++;
      enteredArray[cursor] = e.target.innerHTML;
      cursor++;
    }

    total.innerHTML = arrayToPlainText(enteredArray);
  });
}

for (let ac of allClears) {
  ac.addEventListener('click', (e) => {
    e.preventDefault();
    enteredArray = [];
    cursor = 0;
    total.innerHTML = '0';
  });
}
