import { $TOTAL } from '../util/DOM';
import { OPERATORS, MULTIPLICATION, MSG } from './../util/constant';

export const calculation = () => {
  const total = $TOTAL.innerText;
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
  for (let i = 0; i < total.length; i++) {
    if (`${total[i - 1]}${total[i]}` === '/0') {
      return alert(MSG.DIVISION_0);
    }
  }

  // 수식이 완성되지 않았을 때
  if (OPERATORS.includes(total.slice(total.length - 1))) {
    return alert(MSG.IMPERFECT_EXPRESSION);
  }

  $TOTAL.innerText = Math.floor(eval(expression.join('')));
};
