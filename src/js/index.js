import { add, subtract, multiply, divide } from './util/operators.js';
import { compute, arrayToMergedString } from './util/calculator.js';
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

let enteredArray = [total.innerHTML];
let cursor = 0;

const initialData = (defaultValue = '0') => {
  enteredArray = [(total.innerHTML = defaultValue)];
  cursor = 0;
};

for (let number of numbers) {
  number.addEventListener('click', (e) => {
    const inputValue = e?.target?.innerHTML;
    if (!inputValue) return;

    if (isEnterFromZeroToZero(+inputValue, +enteredArray[cursor])) {
      return;
    }
    enteredArray[cursor] = checkLimitNumber(
      enteredArray[cursor],
      inputValue,
      LIMITED_PLACE_VALUE,
      () => alert('3자리 숫자만 입력 가능합니다.')
    );
    total.innerHTML = arrayToMergedString(enteredArray);
  });
}

for (let operation of operations) {
  operation.addEventListener('click', (e) => {
    const inputValue = e?.target?.innerHTML;
    if (!inputValue) return;

    if (inputValue === '=') {
      const result = compute(enteredArray[0])(op[enteredArray[1]])(
        enteredArray[2]
      ).toFixed(LIMITED_DECIMAL_POINT);
      return initialData(result);
    }

    if (isFalsyEnteredNumber(enteredArray[cursor])) {
      return alert('숫자를 먼저 입력하고 연산자를 입력해 주세요');
    }

    cursor++;
    enteredArray[cursor] = inputValue;
    cursor++;

    total.innerHTML = arrayToMergedString(enteredArray);
  });
}

for (let ac of allClears) {
  ac.addEventListener('click', () => {
    initialData();
  });
}
