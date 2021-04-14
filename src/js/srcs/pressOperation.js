import { $TOTAL } from '../util/DOM';
import { OPERATORS, MAX_NUMBERS, MSG } from '../util/constants';
import { calculation } from './caculation';

export const pressOperation = (operation) => {
  const total = $TOTAL.innerText;
  const fixTotalSplit =
    total[0] === '-' ? total.split('').slice(1) : total.split('');
  const operator = fixTotalSplit.filter((e) => OPERATORS.includes(e));
  const lastNumber = total.slice(
    total.lastIndexOf(operator[operator.length - 1]) + 1,
  );

  if (operation === '=') {
    return calculation();
  }

  // 제한된 숫자의 갯수 이상 계산할 때
  if (lastNumber.length !== 0 && operator.length > MAX_NUMBERS - 2) {
    return alert(MSG.EXCEED_NUMBER_OF_NUMBERS);
  }

  // 다른 연산자를 입력하거나 중복으로 입력했을 때
  if (
    lastNumber[lastNumber.length - 1] !== '0' &&
    !parseInt(total.split('').pop())
  ) {
    return ($TOTAL.innerText = total.slice(0, -1) + operation);
  }

  return ($TOTAL.innerText += operation);
};
