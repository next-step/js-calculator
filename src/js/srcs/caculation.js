import { $TOTAL } from '../utils/DOM';
import { OPERATORS, MULTIPLICATION, MSG } from '../utils/constants';

export const calculation = (cypressTotal) => {
  const total = cypressTotal ? cypressTotal : $TOTAL.innerText;
  let expression = [];
  let num = '';

  for (let i = 0; i < total.split('').length; i++) {
    if (`${total[i - 1]}${total[i]}` === '/0') return alert(MSG.DIVISION_0);
  }

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

  if (OPERATORS.includes(total.slice(total.length - 1))) {
    return alert(MSG.IMPERFECT_EXPRESSION);
  }

  if (!!cypressTotal) return Math.floor(eval(expression.join('')));

  $TOTAL.innerText = Math.floor(eval(expression.join('')));
};
