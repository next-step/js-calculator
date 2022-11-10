import handler from './handler.js'

export const Selectors = {
  digitList: document.getElementsByClassName('digit'),
  operationList: document.getElementsByClassName('operation'),
  modifier: document.getElementsByClassName('modifier')[0],
  display: document.getElementById('total'),
}

Array.from(Selectors.digitList).forEach((digit) => digit.addEventListener('click', handler.digit))
Array.from(Selectors.operationList).forEach((operation) => operation.addEventListener('click', handler.operation))

Selectors.modifier.addEventListener('click', handler.modifier)
