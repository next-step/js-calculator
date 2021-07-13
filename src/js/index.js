function calculator() {
  const total = document.querySelector('#total');
  const modifier = document.querySelector('.modifier');
  const buttons = document.getElementsByClassName('digit');
  const operations = document.getElementsByClassName('operation');
  const result = document.querySelector('.result');

  let num = '';
  let prev = null;
  let next = null;
  let operation = null;

  const reset = () => {
    prev = null;
    next = null;
    operation = null;
    total.innerText = '0';
  };

  const calculate = (prev, next, operation) => {
    switch (operation) {
      case '+':
        return Number(prev) + Number(next);
      case '-':
        return Number(prev) - Number(next);
      case 'X':
        return Number(prev) * Number(next);
      case '/':
        return Number(prev) / Number(next);
    }
  };

  const checkNumber = e => {
    let input = e.target.innerText;
    if (typeof Number(input) === 'number') {
      num += input;
    }

    if (total.innerText === '0') {
      total.innerText = input;
    } else if (num.length <= 3) {
      total.innerText += input;
    } else {
      window.alert('숫자는 3자리까지 입력가능합니다.');
    }
  };

  const checkOperation = e => {
    operation = e.target.innerText;
    if (
      total.innerText === '0' ||
      isNaN(Number(total.innerText[total.innerText.length - 1]))
    ) {
      window.alert('숫자를 먼저 입력한 후 연산자를 입력해주세요.');
    } else {
      if (prev) {
        prev = calculate(prev, num, operation);
        console.log(prev);
      } else {
        prev = num;
      }

      total.innerText += operation;
      num = '';
    }
  };

  const showResult = () => {
    let result = calculate(prev, num, operation);
    total.innerText = `${result}`;
  };

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', checkNumber);
  }

  for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', checkOperation);
  }

  modifier.addEventListener('click', reset);

  result.addEventListener('click', showResult);
}

calculator();
