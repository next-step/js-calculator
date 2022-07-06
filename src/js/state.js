function createValue() {
  const value = [];
 
  function onChange(value) {
    store.push(value)
  }

  function reset() {
    store.length = 0;
  }

  return [value, onChange, reset];
}

export default createValue;