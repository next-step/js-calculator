import {TARGET_NUM, DOM_TYPE, OPERATION, ZERO, ERROR, RES} from '../js/constants/index.js';

function addClickEventListeners(onClickDigit, onClickOperation, onClickModifier) {
  document.querySelectorAll(`.${DOM_TYPE.DIGIT}`).forEach($digit => $digit.addEventListener('click', onClickDigit));
  document.querySelectorAll(`.${DOM_TYPE.OPERATION}`).forEach($operation => $operation.addEventListener('click', onClickOperation));
  document.querySelector(`.${DOM_TYPE.MODIFIER}`).addEventListener('click', onClickModifier);
}

document.addEventListener('DOMContentLoaded', () => {
  const calculateFunctions = {
    [OPERATION.ADD]: (a, b) => a + b,
    [OPERATION.SUBTRACT]: (a, b) => a - b,
    [OPERATION.MULTIPLY]: (a, b) => a * b,
    [OPERATION.DIVIDE]: (a, b) => Math.floor(a / b),
  };

  function onClickDigit(e) {
    if (state.targetNum === TARGET_NUM.NONE) changeMode(TARGET_NUM.FIRST_NUM);
    if (!isValidLength(state[state.targetNum])) return;
    state[state.targetNum] += e.target.textContent;
    updateTotal(state.firstNum + state.operator + state.secondNum);
  }


  function onClickOperation(e) {
    if (state.targetNum === TARGET_NUM.NONE) return;

    if (state.targetNum === TARGET_NUM.FIRST_NUM) {
      if (e.target.textContent === OPERATION.EQUAL) return;
      setState({...state, operator: e.target.textContent})
      updateTotal(state.firstNum + state.operator + state.secondNum);
      changeMode(TARGET_NUM.SECOND_NUM);
      return;
    }

    if (state.secondNum.length === 0) {
      if (e.target.textContent === OPERATION.EQUAL) return;
      setState({...state, operator: e.target.textContent});
      updateTotal(state.firstNum + state.operator + state.secondNum);
      return;
    }

    if (e.target.textContent !== OPERATION.EQUAL) return;

    updateTotal(RES+calculateFunctions[state.operator](Number(state.firstNum), Number(state.secondNum)));
    setState({...initialState});
    changeMode(TARGET_NUM.NONE);
  }

  function onClickModifier() {
    updateTotal(ZERO);
    setState(initialState);
  }

  function isValidLength(number) {
    number.length >= 3 && alert(ERROR.MAX_NUMBER);
    return number.length < 3;
  }

  function changeMode(newMode) {
    state.targetNum = newMode
  }

  function updateTotal(newTotal) {
    document.querySelector(`#${DOM_TYPE.TOTAL}`).textContent = newTotal;
  }

  function setState(newState) {
    state = {...state, ...newState};
  }

  addClickEventListeners(onClickDigit, onClickOperation, onClickModifier);
  const initialState = {firstNum: '', secondNum: '', operator: '', targetNum: TARGET_NUM.NONE};
  let state;
  setState(initialState);
});