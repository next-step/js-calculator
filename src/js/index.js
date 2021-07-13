const totalDisplay = document.getElementById('total')
const numbers = document.querySelectorAll('.digit')
const operations = document.querySelectorAll('.operation')
const modifiers = document.querySelectorAll('.modifier')

let leftNum = '0'
let rightNum = ''
let oper = ''

function updateTotalDisplay() {
  totalDisplay.innerText = leftNum + ' ' + oper + ' ' + rightNum
}

function pressNumber(number) {
  console.log(number)
  if (oper === ''){
    leftNum = leftNum === '0' ? number : Number(leftNum + number)**2 >= 1000000 ? leftNum : Number(leftNum + number).toString()
  }
  else {
    rightNum = rightNum === '0' ? number : Number(rightNum + number)**2 >= 1000000 ? rightNum : Number(rightNum + number).toString()
  }
  updateTotalDisplay()
}

function pressOperation(operation) {
  if (operation === '=') {
    calculate()
    return
  } else if (rightNum === '') {
    oper = operation
    updateTotalDisplay()
  } else {
    calculate()
    oper = operation
    totalDisplay.innerText = leftNum + ' ' + oper
  }
}

function pressAllClear() {
  leftNum = '0'
  rightNum = ''
  oper = ''
  updateTotalDisplay()
}

function calculate() {
  console.log(leftNum, rightNum, oper)
  if (leftNum !== '' && oper !== '' &&  !('+-'.includes(rightNum))) {
    let result = 0
    switch(oper) {
      case '+':
        result = Number(leftNum) + Number(rightNum)
        break
      case '-':
        result = Number(leftNum) - Number(rightNum)
        break
      case 'X':
        result = Number(leftNum) * Number(rightNum)
        break
      case '/':
        if (rightNum !== '0')
          result = parse(Number(leftNum) / Number(rightNum))
        else
          alert('0으로 나눌 수 없습니다.')
        break
    }
    console.log(result)
    leftNum = result.toString()
    rightNum = ''
    oper = ''
    updateTotalDisplay()
  }  
}

numbers.forEach((number) => {
  number.addEventListener('click', (event)=>{
    pressNumber(event.target.innerHTML)
  })
})

operations.forEach((operation) => {
    operation.addEventListener('click', (event)=>{
      pressOperation(event.target.innerHTML)
  })
})

modifiers[0].addEventListener('click', (event)=>{
  pressAllClear()
})