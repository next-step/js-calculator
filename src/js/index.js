class App {
  constructor (app) {
    this.app = app;
    this.$digit = app.querySelector('div.digit');
    this.$modifier = app.querySelector('div.modifier');
    this.$operation = app.querySelector('div.operation');
  }


}

new App(document.querySelector('#app'));
