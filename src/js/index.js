class App {
  constructor (app) {
    this.app = app
    this.$digit = app.querySelector('div.digits')
    this.$modifier = app.querySelector('div.modifiers')
    this.$operation = app.querySelector('div.operations')
    this.addDomEvent()
  }

  addDomEvent () {
    this.$digit.addEventListener('click', this.handleDigit)
    this.$modifier.addEventListener('click', this.handleModifier)
    this.$operation.addEventListener('click', this.handleOperation)
  }

  handleDigit (e) {
    console.log(e, this)
  }

  handleModifier (e) {
    console.log(e, this)

  }

  handleOperation (e) {
    console.log(e, this)

  }


}

new App(document.querySelector('#app'))
