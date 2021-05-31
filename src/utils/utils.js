const $ = (el) => document.querySelector(el)

const operation = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  'X': (a, b) => Number(a) * Number(b),
  '/': (a, b) => ~~(Number(a) / Number(b))
}

const MESSAGE = {
  DIGITS_ALERT_MESSAGE: '숫자는 한번에 최대 3자리 수까지 입력 가능합니다.'
}

export { $, operation, MESSAGE }