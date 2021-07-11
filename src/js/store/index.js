import { OPERATORS } from "../utils/helpers.js";

export default class Store {
  constructor() {
    this.observers = [];
    this.status = "IDLE";
    this.total = "0";
  }
  addObserver(...observers) {
    observers.forEach((observer) => this.observers.push(observer));
  }
  observing() {
    this.observers.forEach((observer) => observer.render());
  }
  updateTotal(num) {
    if (Number(`${this.total}${num}`) > 1000) {
      alert("세자리 숫자까지만 가능합니다.");
      return;
    }
    if (this.total === "0") {
      this.total = `${num}`;
    } else {
      this.total = `${this.total}${num}`;
    }
    this.observing();
  }
  updateOperation(op) {
    const { total, status } = this;

    if (op === status) return;
    if (op === "=") {
      //prettier-ignore
      this.total = total
          .split(status)
          .map(Number)
          .reduce(OPERATORS[status]);
      this.status = "IDLE";
    }
    if (OPERATORS.hasOwnProperty(op)) {
      this.status = op;
      this.total = `${total}${op}`;
    }
    this.observing();
  }
  resetTotal() {
    this.total = 0;
    this.observing();
  }
  getTotal() {
    return this.total;
  }
}
