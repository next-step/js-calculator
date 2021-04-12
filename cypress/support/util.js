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

const parseNumericalExpression = (rawStr) => {
  const reg = /^(-?[0-9]+)([+/X-])([0-9]+)$/gim

  const num1 = rawStr.replace(reg, '$1')
  const operator = rawStr.replace(reg, '$2')
  const num2 = rawStr.replace(reg, '$3')

  return calculate(num1, operator, num2)
}

const parseNumber = (num) => {
  return parseFloat(num)
}

export { parseNumericalExpression, parseNumber }
