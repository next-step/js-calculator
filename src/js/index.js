import { calculatorModule } from './util/calculator.js';

const total = document.getElementById('total');
const numbers = document.getElementsByClassName('digits');
const operations = document.getElementsByClassName('operations');
const allClears = document.getElementsByClassName('modifier');

const { onNumberClickEvent, onOperatorClickEvent, initialData } =
  calculatorModule(total);

numbers[0]?.addEventListener('click', onNumberClickEvent);
operations[0]?.addEventListener('click', onOperatorClickEvent);
allClears[0]?.addEventListener('click', () => initialData());
