import Event from '../constants/Event.js'
import Component from '../core/Component/Component.js'
import {
  calculate,
  resetDisplay,
  setExpression,
  setNumber,
} from '../modules/actions/actions.js'
import {
  CALCULATE,
  RESET_DISPLAY,
  SET_EXPRESSION,
  SET_NUMBER,
} from '../modules/creator/creator.js'
import { store } from '../modules/store.js'
import {
  MAX_INPUT_ERROR,
  NONE_INPUT_WITH_EXPRESSION_ERROR,
} from '../constants/Messages.js'
import { NONE } from '../constants/Display.js'

const Total = (total) => `<h1 id='total'>${total}</h1>`

const Digits = () => {
  return `
        <div class="digits flex">
            <button class="digit" data-action=${SET_NUMBER} >9</button>
            <button class="digit" data-action=${SET_NUMBER} >8</button>
            <button class="digit" data-action=${SET_NUMBER} >7</button>
            <button class="digit" data-action=${SET_NUMBER} >6</button>
            <button class="digit" data-action=${SET_NUMBER} >5</button>
            <button class="digit" data-action=${SET_NUMBER} >4</button>
            <button class="digit" data-action=${SET_NUMBER} >3</button>
            <button class="digit" data-action=${SET_NUMBER} >2</button>
            <button class="digit" data-action=${SET_NUMBER} >1</button>
            <button class="digit" data-action=${SET_NUMBER} >0</button>
        </div>
    `
}

const AC = () => {
  return `
        <div class="modifiers subgrid">
            <button class="modifier" data-action=${RESET_DISPLAY}>AC</button>
        </div>
    `
}

const Expressions = () => {
  return `
        <div class="operations subgrid">
            <button class="operation" data-action=${SET_EXPRESSION}>/</button>
            <button class="operation" data-action=${SET_EXPRESSION}>X</button>
            <button class="operation" data-action=${SET_EXPRESSION}>-</button>
            <button class="operation" data-action=${SET_EXPRESSION}>+</button>
            <button class="operation" data-action=${CALCULATE}>=</button>
        </div>
    `
}

export default class Calculator extends Component {
  constructor(target) {
    super(target)
  }

  setEvent(target) {
    this.addClickEvents(target)
  }

  addClickEvents(target) {
    target.addEventListener(Event.CLICK, (event) => {
      const action = event.target.dataset.action
      const { display, digitCount } = store.getState()
      switch (action) {
        case RESET_DISPLAY:
          store.dispatch(resetDisplay())
          break

        case SET_EXPRESSION:
          if (display === NONE) {
            alert(NONE_INPUT_WITH_EXPRESSION_ERROR)
            break
          }
          store.dispatch(setExpression(event.target.innerText))
          break

        case SET_NUMBER:
          if (digitCount === 3) {
            alert(MAX_INPUT_ERROR)
            break
          }
          store.dispatch(setNumber(event.target.innerText))
          break

        case CALCULATE:
          store.dispatch(calculate())
      }
      event.stopImmediatePropagation()
    })
  }

  template() {
    const { display } = store.getState()

    return `
        ${Total(display)}
        ${Digits()}
        ${AC()}
        ${Expressions()}
    `
  }
}
