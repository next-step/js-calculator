const defaultHistory = { tempNumber: 0, tempOperator: '' };
const defaultCurrentNumber = 0;

const historyStack = [defaultHistory];
let currentNumber = defaultCurrentNumber;

export function popHistoryStack() {
  return historyStack.pop();
}

export function assignHistory(history) {
  historyStack[0](history);
}

export function getCurrentNumber() {
  return currentNumber;
}

export function setCurrentNumber(newCurrentNumber) {
  currentNumber = newCurrentNumber;

  return currentNumber;
}

export function appendNumberToCurrentNumber(newNumber) {
  setCurrentNumber(Number(String(currentNumber) + newNumber));
}

export function initHistoryStack() {
  assignHistory(defaultHistory);
}

function initCurrentNumber() {
  currentNumber = defaultCurrentNumber;
}

export function initStore() {
  initHistoryStack();
  initCurrentNumber();
}
