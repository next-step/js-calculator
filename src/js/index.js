import App from './App.js';

const initialState = { total: '', digitCount: 0, operation: '' };

new App({
  $app: document.querySelector('#app'),
  initialState: initialState || undefined,
});
