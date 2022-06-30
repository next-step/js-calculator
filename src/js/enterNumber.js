import { MAXIMUM_NUMBER_LENGTH } from './constants.js';
import { totalDisplayText } from './index.js';
import { rIsNotNumber } from './regex.js';

const handleDisplayNumber = (number) => {
  const displayResult = totalDisplayText.innerText.concat(number);
  const numberLengthList = displayResult
    .split(rIsNotNumber)
    .map((number) => number.length);

  for (const numberLength of numberLengthList) {
    if (numberLength > MAXIMUM_NUMBER_LENGTH) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');
      return;
    }
  }

  totalDisplayText.innerText = displayResult;
};

const enterNumber = (e) => {
  const { innerText: number } = e.target;

  if (totalDisplayText.innerText === '0') {
    totalDisplayText.innerText = number;
    return;
  }

  handleDisplayNumber(number);
};

export default enterNumber;
