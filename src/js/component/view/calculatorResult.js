export default function CalculatorResult() {
  this.total = document.querySelector("#total");

  this.render = result => {
    this.total.innerHTML =`${result.value}`;
  }

}