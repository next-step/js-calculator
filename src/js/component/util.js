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
      return num1 / num2
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

  return parseNumber(calculate(num1, operator, num2))
}

const parseNumber = (num) => {
  return parseInt(num)
}

const isLimitDigit = (rawStr) => {
  const regNumLength = /[+/X-]?[0-9]{4,}$/gim
  const numList = rawStr.match(regNumLength)

  if (Array.isArray(numList) && numList.length > 0) {
    alert('숫자는 세 자리까지만 입력 가능합니다!')
    return true
  }
  return false
}

const isContinuousOperator = (rawStr) => {
  const operList = rawStr.match(/[+/X-]{2,}/gim)

  if (Array.isArray(operList) && operList.length > 0) {
    alert('연산자는 연속해서 입력 불가')
    return true
  }
  return false
}

const isDuplicateOperator = (rawStr) => {
  const operList = rawStr.match(/[0-9]+[+/X-]/gim)
  if (Array.isArray(operList) && operList.length > 1) {
    alert('연산자는 한개만 가능')
    return true
  }
  return false
}

const calculateNumericalExpression = (rawStr) => {
  if (isRightNumericalExpression(rawStr)) return parseNumericalExpression(rawStr)

  alert('올바른 수식 입력')
  return false
}

const covertZeroZero = (rawStr) => {
  const reg = /([+/X-])0?0([0-9])$/gim

  if (rawStr.match(reg)) return rawStr.replace(reg, '$1$2')
  return rawStr
}

export { calculateNumericalExpression, isLimitDigit, isContinuousOperator, isDuplicateOperator, covertZeroZero }
