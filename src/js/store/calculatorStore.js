const defaultHistory = { tempNumber: 0, tempOperator: '' };
const defaultCurrentNumber = 0;
const defaultControlState = false;

const historyStack = [defaultHistory];
let currentNumber = defaultCurrentNumber;
export let isOperateState = defaultControlState;

export function popHistoryStack() {
  return historyStack.pop();
}

export function assignHistory(history) {
  historyStack[0] = history;
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

export function setIsOperateState(newState) {
  isOperateState = newState || false;
}

export function initHistoryStack() {
  assignHistory(defaultHistory);
}

export function initCurrentNumber() {
  currentNumber = defaultCurrentNumber;
}

function initIsOperateState() {
  isOperateState = defaultControlState;
}

export function initStore() {
  initHistoryStack();
  initCurrentNumber();
  initIsOperateState();
}
