import Calculator from './calculator.js';
import $ from './utils.js';

const calculator = new Calculator();
const buttons = [$('.digits'), $('.modifiers'), $('.operations')];

const renderResult = (string) => {
  $('#total').textContent = string;
};
const handleClick = (event) => {
  try {
    calculator.push(event.target.textContent);

    renderResult(calculator.toString());
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(error.message);
  }
};

buttons.forEach((el) => {
  el.addEventListener('click', handleClick, true);
});
// AC
$('.modifier').addEventListener('click', () => renderResult(calculator.result));
// =
$('#calculate').addEventListener('click', () =>
  renderResult(calculator.result)
);
