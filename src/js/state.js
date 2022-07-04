import { mergeState } from './lib.js';

function useState() {
  let store = [];
 
  function onChange(value) {
    store.push(value)
  }

  function resetValue() {
    store.length = 0;
  }

  return [store, onChange, resetValue];
}

export default useState;