import { $TOTAL } from '../util/DOM';
import { OPERATORS, MULTIPLICATION, MSG } from '../util/constants';

export const calculation = (cypressTotal) => {
  const total = cypressTotal ? cypressTotal : $TOTAL.innerText;
  let expression = [];
  let num = '';

  total.split('').forEach((v, i) => {
    if (OPERATORS.includes(v)) {
      if (v === MULTIPLICATION) v = '*';
      expression.push(num, v);
      num = '';
    } else {
      num += v;
      if (total.length - 1 === i) {
        expression.push(num);
      }
    }
  });

  // 0으로 나눌 때
  total.split('').forEach((e, i) => {
    if (`${total[i - 1]}${total[i]}` === '/0') {
      return alert(MSG.DIVISION_0);
    }
  });

  if (OPERATORS.includes(total.slice(total.length - 1))) {
    return alert(MSG.IMPERFECT_EXPRESSION);
  }

  if (!!cypressTotal) return Math.floor(eval(expression.join('')));

  $TOTAL.innerText = Math.floor(eval(expression.join('')));
};
