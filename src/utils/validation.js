const expressions = ['+', '-', 'X', '/']

const isLastInsertedExpression = (display) => {
  return expressions.includes(display.charAt(display.length - 1))
}

export { isLastInsertedExpression }
