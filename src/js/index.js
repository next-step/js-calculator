import { divideOperatorAndNumber } from '../utils/index.js';

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.sum = '';
    this.operator = '';
    this.total = document.getElementById('total');
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
        if (this.sum === '0') this.sum = '';

        this.sum += e.target.innerHTML;
        this.renderTotal();
      });
    });
  }

  addOperatorListener() {
    const operatorButtons = document.querySelectorAll('.operation');
    operatorButtons.forEach((element) => {
      element.addEventListener('click', (e) => {
        //2개 이상의 연산자를 쓰려는 경우 경고
        if (this.operator && e.target.innerText !== '=') {
          return window.alert('두개의 숫자만 계산할 수 있습니다.');
        }

        //연산자가 있고 적합한 숫자가 들어간 경우 결과를 만든다
        if (this.operator && this.sum && e.target.innerText === '=') {
          this.makeResult();
        }

        //연산자가 없는 상태이고 숫자가 있는 경우 숫자에 연산자를 붙여 보여주며 연산자 상태를 업데이트 해준.
        if (!this.operator && this.sum && e.target.innerText !== '=') {
          this.operator = e.target.innerHTML;
          this.sum += e.target.innerHTML;
          this.renderTotal();
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
