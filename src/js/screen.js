export default function Screen(result) {
  this.leftSide = '';
  this.rightSide = '';
  this.op = '';

  this.$result = result;
  this.render = (currentResult) => {
    this.$result.innerText = currentResult
      ? currentResult
      : `${this.leftSide}${this.op}${this.rightSide}`;
  };

  this.setOperand = (digit) => {
    let current = this.op ? this.rightSide : this.leftSide;
    if (current.length >= 3) return alert('no more 3');
    else if (current === '' && digit === '0') return;
    current += digit;
    this.op ? (this.rightSide = current) : (this.leftSide = current);
    this.render();
  };

  this.calcul = () => {
    const options = {
      '+': () => +this.leftSide + +this.rightSide,
      '-': () => +this.leftSide - +this.rightSide,
      X: () => +this.leftSide * +this.rightSide,
      '/': () => +this.leftSide / +this.rightSide,
    };
    const res = String(Math.floor(options[this.op]()));
    this.render(res);
    this.init();
    this.leftSide = res;
  };

  this.setOperator = (op) => {
    if (!this.op && op === '=') return;
    else if (op === '=') return this.calcul();
    else if (this.op) {
      return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    }

    this.op = op;
    this.render();
  };

  this.allClear = () => {
    this.init();
    this.render('0');
  };

  this.init = () => {
    this.leftSide = '';
    this.rightSide = '';
    this.op = '';
  };
}
