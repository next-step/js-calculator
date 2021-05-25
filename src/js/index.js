import '../css/index.css';
import { $ } from './utils/querySelector';
import { $TOTAL } from './utils/DOM';
import { pressDigit } from './srcs/pressDigit';
import { pressOperation } from './srcs/pressOperation';

const calculator = ({ target }) => {
  if (target.classList.contains('modifier')) {
    return ($TOTAL.innerText = '0');
  }

  if (target.classList.contains('digit')) {
    return pressDigit(target.innerText);
  }

  if (target.classList.contains('operation')) {
    return pressOperation(target.innerText);
  }
};

window.onload = () => {
  $('.calculator').addEventListener('click', calculator);
};
