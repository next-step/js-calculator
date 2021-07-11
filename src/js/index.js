const total = document.getElementById('total')
const buttons = document.querySelectorAll('button')
let calc = false
let end = false
let number1 = ''
let number2 = ''
let length = 0
let pos = 0

class Calculator{
    constructor(total){
        this.total = total
        this.clear()
    }

    numberInput(number){
        if (length < 3){
            length += 1
            this.content += number
            end = true
            if (number1 === '') {
                number1 = this.content
            } else {
                console.log('')
            }
        }else{
            alert('숫자는 최대 3자리만 입력됩니다.')
        }
    }

    operationMultiple(){
        this.content += '*'
        length = 0
    }

    operationDivide(){
        this.content += '/'
        length = 0   
    }

    operationPlus(){
        this.content += '+'
        length = 0
    }

    operationMinus(){
        this.content += '-'
        length = 0
    }
    operationOutput(){
        if (calc === '+'){
            pos = this.content.indexOf('+')
        } else if (calc === '-'){
            pos = this.content.indexOf('-')
        } else if (calc ==='/'){
            pos = this.content.indexOf('/')
        } else if (calc ==='*'){
            pos = this.content.indexOf('*')
        }
        number1 = this.content.slice(0,pos)
        number2 = this.content.slice(pos+1)


        if (calc === '/'){
            this.content = Math.floor(Number(number1) / Number(number2))
        }else if(calc === '*'){
            this.content = Number(number1) * Number(number2)
        }else if(calc === '-'){
            this.content = Number(number1) - Number(number2)
        }else if(calc === '+'){
            this.content = Number(number1) + Number(number2)
        }

        console.log('output',this.content,pos , typeof number1 , typeof number2 , number1 , number2,calc)
        end = false
        length = String(this.content).length
    }

    updateDisplay(){
        this.total.innerText = this.content
    }

    clear(){
        this.content = ''
        length = 0
        this.total.innerText = '0'
    }

}

const calculator = new Calculator(total)

buttons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        switch(button.value){
            case 'divide':
                if (end === true){
                    calc = '/'
                    end = false
                    calculator.operationDivide()
                    calculator.updateDisplay()
                    break
                }
            case 'multiple':
                if (end === true){
                    calc = '*'
                    end = false
                    calculator.operationMultiple()
                    calculator.updateDisplay()
                    break
                }
            case 'minus':
                if (end === true){
                    calc = '-'
                    end = false
                    calculator.operationMinus()
                    calculator.updateDisplay()
                    break
                }
            case 'plus':
                if (end === true){
                    calc = '+'
                    end = false
                    calculator.operationPlus()
                    calculator.updateDisplay()
                    break
                }
            case 'equal':
                if (number1 !== 0 && number2 !== 0 ){
                    end = false
                    calculator.operationOutput()
                    calculator.updateDisplay()
                    break
                }
            case 'modifier':
                calculator.clear()
                end = false
                break
            default:
                calculator.numberInput(button.innerText)
                calculator.updateDisplay()
                break
        }
    })
})