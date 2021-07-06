import Calculator from '../components/Calculator.js'
import { resetDisplay } from '../modules/actions/actions.js'
import { store } from '../modules/store.js'

class App {
  constructor() {
    const calculator = document.querySelector('#calculator')

    store.subscribe(() => {
      new Calculator(calculator, store)
    })

    this.initStore()
  }

  initStore() {
    store.dispatch(resetDisplay())
  }
}

new App()
