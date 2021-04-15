import { $TOTAL } from '../util/DOM';
import { MAX_NUMBER_LENGTH, MSG } from '../util/constants';
import { OPERATORS } from '../util/constants';

export const pressDigit = (digit) => {
  const operator = $TOTAL.innerText
    .split('')
    .filter((e) => OPERATORS.includes(e));
  const lastNumber = $TOTAL.innerText.slice(
    $TOTAL.innerText.lastIndexOf(operator[operator.length - 1]) + 1,
  );

  if (lastNumber === '0' && digit === '0') {
    return;
  }

  if (lastNumber === '0' && digit !== '0') {
    return ($TOTAL.innerText = $TOTAL.innerText.slice(0, -1) + digit);
  }

  if (lastNumber.length > MAX_NUMBER_LENGTH - 1) {
    return alert(MSG.EXCEED_NUMBER_LENGTH);
  }

  $TOTAL.innerText += digit;
};
