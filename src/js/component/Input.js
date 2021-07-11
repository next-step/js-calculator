export default class Input {
  constructor(store, $app) {
    this.$app = $app;
    this.store = store;
    this.mount();
  }
  mount() {
    this.$app.addEventListener("click", (e) => {
      if (e.target.className === "digit") {
        this.store.updateTotal(e.target.textContent);
      }
      if (e.target.className === "operation") {
        this.store.updateOperation(e.target.textContent);
      }
      if (e.target.className === "modifier") {
        this.store.resetTotal();
      }
    });
  }
  render() {}
}
