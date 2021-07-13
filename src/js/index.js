const buttons = document.querySelectorAll('button')
const total = document.getElementById('total')

let formula = this.total
let inputNumber = ''
let inputList = []

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.className === 'digit') {
            if (this.formula === undefined || this.formula === 0) {
                this.formula = button.innerHTML
                this.inputNumber = button.innerHTML
            } else {
                // 세 자리 숫자 판별
                if (this.inputNumber === undefined) {
                    this.inputNumber = button.innerHTML
                } else {
                    if (this.inputNumber.length === 3) {
                        alert('숫자는 세 자리까지만 입력해주세요!')
                    } else {
                        this.inputNumber += button.innerHTML
                        this.formula += button.innerHTML
                    }
                }
            }
            this.total.innerText = this.formula
        } else if (button.className === 'operation') {
            if (this.formula === undefined) {
                alert('숫자를 먼저 입력해주세요!')
            } else {
                if (this.inputList === undefined || this.inputList.length === 0) {
                    this.inputList = [this.inputNumber]
                    this.inputList.push(button.innerHTML)
                    this.formula += button.innerHTML
                } else {
                    if (button.innerHTML === '=') {
                        if (this.inputNumber.length > 0) {
                            this.inputList.push(this.inputNumber)
                            if (this.inputList[1] === '+') {
                                this.inputList = [Number(this.inputList[0]) + Number(this.inputList[2])]
                            } else if (this.inputList[1] === '-') {
                                this.inputList = [Number(this.inputList[0]) - Number(this.inputList[2])]
                            } else if (this.inputList[1] === 'X') {
                                this.inputList = [Number(this.inputList[0]) * Number(this.inputList[2])]
                            } else if (this.inputList[1] === '/') {
                                this.inputList = [Number(this.inputList[0]) / Number(this.inputList[2])]
                            }
                            this.formula = this.inputList[0]
                        } else {
                            this.formula = this.inputList[0]
                            this.inputList = [this.inputList[0]]
                        }
                    } else {
                        if (this.inputNumber.length > 0) {
                            this.inputList.push(this.inputNumber)
                        }
                        if (isNaN(this.inputList[this.inputList.length - 1])) {
                            alert('숫자를 먼저 입력해주세요!')
                        } else {
                            this.inputList.push(button.innerHTML)
                            this.formula += button.innerHTML
                        }
                    }
                }
                this.inputNumber = ''
                this.total.innerText = this.formula
                console.log(this.inputList)
            }
        } else if (button.className === 'modifier') {
            this.total.innerText = 0
            this.formula = ''
            this.inputNumber = ''
            this.inputList = []
        }
    })
})