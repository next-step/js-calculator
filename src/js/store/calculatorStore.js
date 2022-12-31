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

function checkIsValidNewCurrentNumber(newCurrentNumber) {
  return newCurrentNumber / 100 > 10;
}

export function appendNumberToCurrentNumber(newNumber) {
  const newCurrentNumber = Number(String(currentNumber) + newNumber);

  if (checkIsValidNewCurrentNumber(newCurrentNumber)) return;

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
