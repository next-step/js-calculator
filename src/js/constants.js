export const Operators = {
  Add: '+',
  Subtract: '-',
  Multiply: 'X',
  Divide: '/',
  Equal: '=',
}
export const OperatorSet = new Set(['+', '-', 'X', '/', '='])
export const NumberSet = new Set([...Array.from({ length: 10 }).map((_, i) => i + ''), '-'])

export const ErrorMessages = {
  DivideZero: '어떤 수든 0으로 나눌 수 없음',
  Operator: '연산자 오류',
  Operand: '피연산자 오류',
  Result: '처리 결과 오류',
  NoNumber: '숫자가 아님',
  NoOperator: ' 연산자가 아님',
  MaxDigits: '최대 3자리까지만 입력 가능',
}
