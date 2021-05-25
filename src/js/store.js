export default function store() {
  let buffer = '';
  let operand;
  let operation;

  function updateBuffer(digit) {
    buffer += digit;
    return buffer;
  }

  function setOperation(op) {
    operation = op;
    operand = Number.parseInt(buffer);
    buffer = '';
  }

  function setResult(result) {
    flush();
    buffer = result;
  }

  function flush() {
    buffer = operand = operation = '';
  }

  function getState() {
    return {
      buffer,
      operand,
      operation,
    };
  }

  return {
    updateBuffer,
    setOperation,
    setResult,
    flush,
    getState,
  };
}
