import { Digits } from './component/Digits.js';
import { Operation } from './component/Operation.js';
import { Modifier } from './component/Modifier.js';

(() => {
  const $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    totalEle = $('#total');

  // 관리되어야 될 상태
  const state = {
    prevInput: '',
    currInput: '',
    operator: '',
  };

  function display(p) {
    totalEle.innerText = p;
  }

  new Digits($$('.digits'), display, state);
  new Operation($$('.operation'), display, state);
  new Modifier($('.modifier'), display, state);
})();
