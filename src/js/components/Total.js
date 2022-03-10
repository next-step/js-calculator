class Total {
  constructor(target) {
    this.$target = target;
  }

  recordTotalValue(value) {
    this.$target.innerHTML += value;
  }
}

export default Total;
