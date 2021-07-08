function View() {
  this.$total = document.querySelector('#total');
  this.$modifier = document.querySelector('#modifier');
  this.$digits = document.querySelector('#digits');
  this.$operators = document.querySelector('#operators');
}

View.prototype.render = function (value) {
  if (+this.$total.textContent === 0) {
    this.$total.textContent = '';
  }

  this.$total.textContent += String(value);
};

View.prototype.renderResult = function (result) {
  this.$total.textContent = String(result);
};

View.prototype.resetTotal = function () {
  this.$total.textContent = '0';
};

export default View;
