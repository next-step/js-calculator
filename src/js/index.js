class App {
  constructor (app) {
    this.app = app
    this.result = 0
    this.digitlen = 0;
    this.operator = ''
    this.$total = app.querySelector('#total')
    this.$digit = app.querySelector('div.digits')
    this.$modifier = app.querySelector('div.modifiers')
    this.$operation = app.querySelector('div.operations')
    this.addDomEvent()
  }

  addDomEvent () {
    this.$digit.addEventListener('click', this.handleDigit)
    this.$modifier.addEventListener('click', this.handleModifier)
    this.$operation.addEventListener('click', this.handleOperation)
  }

  handleDigit = (e) => {
    const value = e.target.textContent
    let total = this.$total.textContent;
    total.length === 1 && total === '0' &&  (this.$total.textContent = '')
    if (this.digitlen < 3) {
      this.$total.textContent += value;
      this.digitlen += 1;
    } else {
      alert('숫자는 세 자리까지만 입력 가능합니다!')
    }
    console.log(e, this, this.$total.textContent)
  }

  handleModifier = () => {
    this.$total.textContent = 0;
    this.digitlen = 0;
  }

  handleOperation = (e) => {

    const oper = e.target.textContent
    let total = this.$total.textContent;
    if (oper === '=') {
      const [first, second] = total.split(this.operator);
      switch (this.operator) {
        case 'X' :
          let sum = ( +first) * (+second)
          this.$total.textContent = sum
      }
      return ;
    }
    if (isNaN(total[total.length - 1])) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
    } else {
      this.$total.textContent += oper;
      this.operator = oper;
      this.digitlen = 0;
    }

    console.log(e, this)

  }

}

new App(document.querySelector('#app'))
