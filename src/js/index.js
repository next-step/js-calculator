import App from './App.js';

new App({
  operand: '',
  result: 0,
  $targetDisplay: document.querySelector('#id'),
  $targetDigits: document.querySelector('.digits'),
  $targetModifier: document.querySelector('.modifiers'),
  $targetOperations: document.querySelector('.operations'),
});
