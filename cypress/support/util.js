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
  }
}

const parseNumericalExpression = (rawStr) => {
  const regEual = /-?[0-9]+([+/X-])[0-9]+/gim
  const operator = rawStr.replace(regEual, '$1')

  return rawStr.split(/[+/X-]/).reduce((num1, num2) => calculate(num1, operator, num2))
}

const parseNumber = (num) => {
  return parseInt(num)
}

export { parseNumericalExpression }
