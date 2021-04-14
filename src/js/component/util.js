const calculate = (strNum1, operator, strNum2) => {
  const num1 = parseNumber(strNum1)
  const num2 = parseNumber(strNum2)

  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case 'X':
      return num1 * num2
    case '/':
      return Math.floor(num1 / num2)
  }
}

const isRightNumericalExpression = (rawStr) => {
  return /^-?[0-9]+([+/X-])[0-9]+$/gim.test(rawStr)
}

const parseNumericalExpression = (rawStr) => {
  const reg = /^(-?[0-9]+)([+/X-])([0-9]+)$/gim

  const num1 = rawStr.replace(reg, '$1')
  const operator = rawStr.replace(reg, '$2')
  const num2 = rawStr.replace(reg, '$3')

  return calculate(num1, operator, num2).toString()
}

const parseNumber = (num) => {
  return parseFloat(num)
}

const isLimitDigit = (tempStr) => {
  const numbers = tempStr.match(/[+/X-]?[0-9]{4,}$/gim)

  if (Array.isArray(numbers) && numbers.length > 0) return true
  return false
}

const isContinuousOperator = (rawStr) => {
  const operators = rawStr.match(/[+/X-]{2,}/gim)

  if (Array.isArray(operators) && operators.length > 0) return true
  return false
}

const isDuplicateOperator = (rawStr) => {
  const operators = rawStr.match(/[0-9]+[+/X-]/gim)
  if (Array.isArray(operators) && operators.length > 1) return true
  return false
}

const convertZeroZero = (rawStr) => {
  const reg = /([+/X-])0?0([0-9])$/gim

  if (rawStr.match(reg)) return rawStr.replace(reg, '$1$2')
  return rawStr
}

const addClickEvent = (selector, func) => {
  const targetDom = document.querySelector(selector)
  targetDom.addEventListener('click', func)
}

export { isLimitDigit, isContinuousOperator, isDuplicateOperator, isRightNumericalExpression, convertZeroZero, parseNumericalExpression, addClickEvent }
