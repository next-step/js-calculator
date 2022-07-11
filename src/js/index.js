let inputArray = []
let input = ''

const updateValue = (value) => {
  const isLastValueOperation = Number.isNaN(Number(inputArray.at(-1)))

  if (isLastValueOperation) {
    input = ''
  }

  if (input.length === 3) {
    alert('숫자는 세 자리까지만 입력 가능합니다!')
    return
  }

  input += value

  if (isLastValueOperation) {
    inputArray[inputArray.length === 0 ? 0 : inputArray.length] = input
  } else if (!isLastValueOperation) {
    inputArray[inputArray.length - 1] = input
  }

  render()
}

const updateOperation = (operation) => {
  if (!inputArray.at(-1) || Number.isNaN(Number(inputArray.at(-1)))) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
    return
  }

  if (operation === '=') {
    calculateInputArray()
    return
  }

  const currentIndex = inputArray.length === 0 ? 0 : inputArray.length
  inputArray[currentIndex] = operation

  render()
}

const calculateInputArray = () => {
  const [num1, operation, num2] = inputArray
  const [number1, number2] = [+num1, +num2]

  switch (true) {
    case operation === '+':
      render(number1 + number2)
      break

    case operation === '-':
      render(number1 - number2)
      break

    case operation === 'X':
      render(number1 * number2)
      break

    case operation === '/':
      render(Number(number1 / number2).toFixed(0))
      break
  }
}

const resetInput = () => {
  inputArray = []
  input = ''

  render()
}

const render = (calculateResult) => {
  const total = document.querySelector('#total')
  const expression = inputArray.length === 0 ? 0 : inputArray.join('')

  total.innerHTML = calculateResult ?? expression

  if (calculateResult) {
    input = ''
    inputArray = [calculateResult]
  }
}

const handlers = () => {
  document.addEventListener('click', (event) => {
    const { tagName, className: action, innerText: value } = event.target

    const isTagButton = tagName.toLowerCase() === 'button'

    if (!isTagButton) {
      return
    }

    switch (true) {
      case action === 'digit':
        updateValue(value)
        break

      case action === 'operation':
        updateOperation(value)
        break

      case action === 'modifier':
        resetInput()
        break
    }
  })
}

window.addEventListener('load', () => {
  handlers()
})
