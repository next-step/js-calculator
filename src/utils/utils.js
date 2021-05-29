const $ = (el) => document.querySelector(el)

const operation = {
  '+': (a, b) => Number(a) + Number(b),
  '-': (a, b) => Number(a) - Number(b),
  'X': (a, b) => Number(a) * Number(b),
  '/': (a, b) => ~~(Number(a) / Number(b))
}

export { $, operation }