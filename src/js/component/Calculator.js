import { calculatorTemplate } from '../template/calculatorTemplate.js'
import { addClickEvent } from './util.js'

export function Calculator({ $calculatorDom, initState, onDigitsClick, onOperationsClick, onAcClick }) {
  const init = () => {
    this.state = initState

    $calculatorDom.innerHTML = calculatorTemplate
    this.$totalDom = document.querySelector('#total')

    addClickEvent('.digits.flex', onDigitsClick)
    addClickEvent('.operations.subgrid', onOperationsClick)
    addClickEvent('.modifier', onAcClick)

    this.render()
  }

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState }
    this.render()
  }

  this.render = () => {
    this.$totalDom.innerHTML = this.state.rawStr
  }

  init()
}
