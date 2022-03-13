import { qs, qsAll, on } from './helpers.js';

const digits = qsAll('.digit');
const operations = qsAll('.operation');

digits.forEach((element) => {
  on(element, 'click', () => {
    console.log(element.innerText);
  });
});

operations.forEach((element) => {
  on(element, 'click', () => {
    console.log(element.innerText);
  });
});
