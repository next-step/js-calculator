import App from './Components/App.js';

const $app = document.querySelector('#app');
const initialState = { total: '', digitCount: 0, operation: '' };

new App($app, initialState || undefined);
