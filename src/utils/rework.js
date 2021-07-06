import { isLastInsertedExpression } from './validation.js'

const parseLastExpression = (display) =>
  display.substring(0, display.length - 1)

const changeExpression = ({ display }, expression) => {
  if (isLastInsertedExpression(display)) {
    return parseLastExpression(display) + expression
  }

  return display + expression
}

const expressions = ['+', '-', 'X', '/']

const calculateDisplay = (display) => {
  if (isLastInsertedExpression(display)) {
    display = parseLastExpression(display)
  }

  const expressionRegex = /[\+\/\-\X]+/g
  const numbers = display.split(/\+|\-|\X|\//)
  const matchesExpressions = expressionRegex[Symbol.matchAll](display)
  const insertedExpressions = Array.from(matchesExpressions, (x) => x[0])

  const numberStack = []
  const expressionStack = []

  // 곱하기 나누기 연산
  numbers.forEach((number, index) => {
    number = +number
    if (index === 0) {
      numberStack.push(number)
      return
    }

    const expression = insertedExpressions[index - 1]

    if (expression === 'X' || expression === '/') {
      const prevNumber = numberStack.pop()

      if (expression === 'X') {
        numberStack.push(prevNumber * number)
        return
      }

      numberStack.push(prevNumber / number)
      return
    }

    numberStack.push(number)
    expressionStack.push(expression)
  })

  let answer = 0

  numberStack.forEach((number, index) => {
    if (index === 0) {
      answer = number
      return
    }

    const expression = expressionStack[index - 1]

    if (expression === '+') {
      answer += number
      return
    }

    answer -= number
  })

  answer = Math.floor(answer)

  return answer + ''
}

export { changeExpression, calculateDisplay }
