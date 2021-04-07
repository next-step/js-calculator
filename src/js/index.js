class App {
  constructor (app) {
    this.app = app;
    this.$digit = app.querySelector('div.digit');
    this.$modifier = app.querySelector('div.modifier');
    this.$operation = app.querySelector('div.operation');
    this.addDomEvent()
  }

  addDomEvent() {
    this.$digit.addEventListener('click', this.handleDigit);
    this.$modifier.addEventListener('click', this.handleModifier);
    this.$operation.addEventListener('click', this.handleOperation);
  }
}

new App(document.querySelector('#app'));
