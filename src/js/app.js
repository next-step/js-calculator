import { OPERATIONS } from './util.js';
import calculator from './calculator.js';
import store from './store.js';

export default function App() {
  const $calculator = document.querySelector('.calculator');

  const _store = store();
  const component = calculator($calculator);

  function calculate() {
    const state = _store.getState();

    return OPERATIONS[state.operation](
      state.operand,
      Number.parseInt(state.buffer)
    );
  }

  $calculator.addEventListener('digits', ({ detail }) => {
    const current = _store.updateBuffer(detail);
    component.render(current);
  });

  $calculator.addEventListener('op', ({ detail }) => {
    _store.setOperation(detail);
  });

  $calculator.addEventListener('ac', () => {
    _store.flush();

    component.render('0');
  });

  $calculator.addEventListener('calculate', () => {
    const result = calculate();

    _store.setResult(result);
    component.render(result);
  });
}
