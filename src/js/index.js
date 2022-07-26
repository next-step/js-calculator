import { state } from './state.js'
import { makeDigit } from './digit.js'
import { reset } from './modifier.js'
import { makeOperation } from './operation.js'

const addEvent = (type, selector, handler) => {
  const $el = document.querySelectorAll(selector)
  Array.from($el).forEach((el) =>
    el.addEventListener(type, (event) => handler(event))
  )
}

const handlers = () => {
  addEvent('click', '.digit', (event) => makeDigit(event))
  addEvent('click', '.operation', (event) => makeOperation(event))
  addEvent('click', '.modifier', () => reset())
}

const render = (total) => {
  const $total = document.querySelector('#total')
  const expression = state.inputArr.join('')

  $total.innerHTML = total ?? expression
}

const App = () => {
  handlers()
}

App()

export { addEvent, render }
