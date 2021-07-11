export default class Display {
  constructor(store, $app) {
    this.$app = $app;
    this.store = store;
  }
  mount() {}
  render() {
    this.$app.innerHTML = `<h1 id="total">
            ${this.store.getTotal()}
            </h1>`;
  }
}
