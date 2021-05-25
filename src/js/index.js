const app = document.querySelector('#app');
const total = document.querySelector('#total');
const digits = app.querySelector('.digits');
const modifier = app.querySelector('.modifier');
const operations = app.querySelector('.operations');
const operatorRegexp = /[-+X/]/;
const calcRegexp = /(\d{1,3})[X|/|+|-](\d{1,3})/;
let digitList = [];
let setModifier = '';
let display = '';
let digitLength = 0;

const resetCalculation = () => {
  total.innerText = 0;
  digitList = [];
  display = '';
  digitLength = 0;
}

const getDigits = (e) => {
  if (digitLength >= 3) {
    alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다 :)');
    return false;
  } else {
    display += e.target.innerText;
    digitLength++;
  }

  total.innerText = display;
}

const getOperation = (e) => {
  if (display.length < 1) {
    alert('숫자 입력 후 연산자 입력이 가능합니다 :)');
    return false;
  }
  if (digitList >= 2) return false;
  
  if (e.target.innerText === '=') {
    if (calcRegexp.test(total.innerText)) total.innerText = calculation();
    return false;
  } else {
    if (digitList.length > 2) return false;
    
    digitList.push(display);
    setModifier = e.target.innerText;
    if (!operatorRegexp.test(display)) display += e.target.innerText;
  }
  
  total.innerText = display;
  digitList = [];
  digitLength = 0;
}

const calculation = () => {
  digitList = display.replace(operatorRegexp,' ').split(' ').map(digit => parseInt(digit));
  const calc = Math.floor(eval(`${digitList[0]} ${(setModifier === 'X') ? '*' : setModifier} ${digitList[1]}`));
  display = calc || '';
  digitLength = display.toString().split('').length;
  
  return calc;
}

modifier.addEventListener('click', resetCalculation);
digits.addEventListener('click', getDigits);
operations.addEventListener('click', getOperation);