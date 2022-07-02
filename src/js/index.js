import handleNumber from './clickNumber.js';

const totalValue = document.querySelector('#total');
const digitsButton = document.querySelector('.digits');

let input = '';

digitsButton.addEventListener('click', (e) => {
  const { innerText: numberText } = e.target;

  if (input === '' && numberText === '0') {
    return;
  }

  input = handleNumber(numberText, input);
  totalValue.innerText = input;
});
