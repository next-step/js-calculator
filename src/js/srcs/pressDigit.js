import { $TOTAL } from '../util/DOM';
import { MAX_NUMBER_LENGTH, MSG } from '../util/constant';
import { OPERATORS } from './../util/constant';

export const pressDigit = (digit) => {
  const operator = $TOTAL.innerText
    .split('')
    .filter((e) => OPERATORS.includes(e));
  const lastNumber = $TOTAL.innerText.slice(
    $TOTAL.innerText.lastIndexOf(operator[operator.length - 1]) + 1,
  );

  // 0 연속 입력시
  if (lastNumber === '0' && digit === '0') {
    return;
  }

  // 0 입력하고 다른 숫자 입력할 때 0 지우기
  if (lastNumber === '0' && digit !== '0') {
    return ($TOTAL.innerText = $TOTAL.innerText.slice(0, -1) + digit);
  }

  // 제한 자리수 이상 입력시
  if (lastNumber.length > MAX_NUMBER_LENGTH - 1) {
    return alert(MSG.EXCEED_NUMBER_LENGTH);
  }

  $TOTAL.innerText += digit;
};
