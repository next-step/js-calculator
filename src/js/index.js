const divideOperatorAndNumber = (text) => {
  if (text.includes('+')) {
    const [a, b] = text.split('+');
    return [a, b, '+'];
  }
  if (text.includes('-')) {
    const [a, b] = text.split('-');
    return [a, b, '-'];
  }
  if (text.includes('X')) {
    const [a, b] = text.split('X');
    return [a, b, 'X'];
  }
  if (text.includes('/')) {
    const [a, b] = text.split('/');
    return [a, b, '/'];
  }
  return [text, '', ''];
};

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.sum = '';
    this.total = document.getElementById('total');
    this.operator = '';
  }

  add(a, b) {
    this.sum = Number(a) + Number(b);
    this.renderTotal();
  }

  subtract(a, b) {
    this.sum = a - b;
    this.renderTotal();
  }

  multiple(a, b) {
    this.sum = a * b;
    this.renderTotal();
  }

  divide(a, b) {
    this.sum = Math.round(a / b);
    this.renderTotal();
  }

  clear() {
    this.sum = '0';
    this.operator = '';
    this.renderTotal();
  }

  renderTotal() {
    this.total.innerText = this.sum;
  }

  makeResult() {
    const [a, b, operator] = divideOperatorAndNumber(this.sum);
    if (operator === '+') return this.add(a, b);
    if (operator === '-') return this.subtract(a, b);
    if (operator === 'X') return this.multiple(a, b);
    if (operator === '/') return this.divide(a, b);
  }

  addNumberListener() {
    const numberButtons = document.querySelectorAll('.digit');
    numberButtons.forEach((element) => {
      element.addEventListener('click', (e) => {
        //숫자가 3자리수 이상 기입되는 경우 경고를 해준다.
        const [a, b, _] = divideOperatorAndNumber(
          this.sum + e.target.innerText
        );
        if (a.length > 3 || b.length > 3) {
          return window.alert('숫자는 세 자리까지만 입력 가능합니다!');
        }

        this.sum += e.target.innerHTML;
        this.renderTotal();
      });
    });
  }

  addOperatorListener() {
    const operatorButtons = document.querySelectorAll('.operation');
    operatorButtons.forEach((element) => {
      element.addEventListener('click', (e) => {
        //연산자가 있고 적합한 숫자가 들어간 경우 결과를 만든다
        if (e.target.innerText === '=' && this.operator && this.sum) {
          this.makeResult();
        }

        //연산자가 없는 상태이고 숫자가 있는 경우 숫자에 연산자를 붙여 보여주며 연산자 상태를 업데이트 해준.
        if (!this.operator && this.sum && e.target.innerText !== '=') {
          this.operator = e.target.innerHTML;
          this.sum += e.target.innerHTML;
          this.renderTotal();
          return;
        }
      });
    });
  }

  addModifierListener() {
    const modifierButton = document.querySelector('.modifier');
    modifierButton.addEventListener('click', (_) => {
      if (this.sum) this.clear();
    });
  }

  addListeners() {
    this.addNumberListener();
    this.addOperatorListener();
    this.addModifierListener();
  }
}

const app = new App({ $target: document.getElementById('app') });
app.addListeners();
