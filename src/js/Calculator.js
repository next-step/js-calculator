export default class Calculator {
  $target;
  $total;
  constructor($target) {
    this.$target = $target;
    this.$total = this.$target.querySelector("#total");
    this.bindEvents();
  }

  bindEvents() {
    const onClick = (e) => {};
    this.$target.addEventListener("click", (e) => onClick(e));
  }
}
