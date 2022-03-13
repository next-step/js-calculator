const digitBtn = document.getElementById('num');
const totalInput = document.getElementById('total');
const resetBtn = document.getElementsByClassName('modifier')[0];
const operatorBtn = document.getElementById('operator');

digitBtn.addEventListener('click', function (e) {
  removeFirstZero();
  const { nodeValue } = e.target.firstChild;

  if (!isMaxLength()) {
    totalInput.innerText += nodeValue;
  } else {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
  }
});

resetBtn.addEventListener('click', function () {
  totalInput.innerText = 0;
});

operatorBtn.addEventListener('click', function (e) {
  removeFirstZero();
  const { nodeValue } = e.target.firstChild;
  const { textContent } = totalInput;

  if (textContent && nodeValue === '=') {
    calc();
    return;
  }

  if (isNaN(Number(textContent[textContent.length - 1]))) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    totalInput.innerText = 0;
  } else {
    if (isOperator(nodeValue)) {
      totalInput.innerText += nodeValue;
    }
  }
});

const findNumber = (operator) => {
  const { textContent } = totalInput;
  return textContent.split(operator).filter((elem) => !isNaN(Number(elem)));
};

const findOperator = () => {
  const { textContent } = totalInput;
  return textContent.split('').filter((elem) => isNaN(Number(elem)));
};

const removeFirstZero = () => {
  const { textContent } = totalInput;
  return textContent[0] === '0' && (totalInput.innerText = '');
};

const isMaxLength = () => {
  const operator = findOperator();

  if (operator[0]) {
    const res = findNumber(operator);
    return res[1].length < 3 ? false : true;
  } else {
    const res = findNumber(operator);
    return res.length < 3 ? false : true;
  }
};

const isOperator = (nodeValue) => {
  const operator = findOperator();

  if (operator.length === 0) {
    return true;
  } else {
    return nodeValue === '=' ? true : false;
  }
};

const calc = () => {
  const operator = findOperator()[0];
  const res = findNumber(operator);

  if (operator === '+') {
    totalInput.innerText = Number(res[0]) + Number(res[1]);
  }
  if (operator === '-') {
    totalInput.innerText = Number(res[0]) - Number(res[1]);
  }
  if (operator === 'X') {
    totalInput.innerText = Number(res[0]) * Number(res[1]);
  }
  if (operator === '/') {
    totalInput.innerText = Math.floor(Number(res[0]) / Number(res[1]));
  }
};
