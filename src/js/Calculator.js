import { OPERATIONS, MESSAGES, MAX_NUMBER_LENGTH } from "./constants.js";
import ComputedData from "./ComputedData.js";
import Display from "./Display.js";

export default function Calculator() {
  const state = {
    clickedDigits: [0, 0],
    operation: "",
    result: "",
  };

  const render = () => {
    onClickDigit();
    onClickOperation();
    onClickAC();
  };

  const $ = selector => document.querySelector(selector);
  const $digits = $(".digits");
  const $operations = $(".operations");
  const $modifier = $(".modifier");

  const onClickDigit = () => {
    $digits.addEventListener("click", e => {
      addDigit(e.target.value);
    });
  };

  const onClickOperation = () => {
    $operations.addEventListener("click", e => {
      if (
        !!state.clickedDigits[1] &&
        e.target.textContent === OPERATIONS.CALCULATE
      ) {
        calculateDigits();
        displayState();
        return;
      }
      addOperation(e.target.textContent);
    });
  };

  const addDigit = digit => {
    const { clickedDigits, operation, result } = state;
    const hasOperation = !!operation ? 1 : 0;
    const digitLength = clickedDigits[hasOperation].toString().length;

    if (digitLength + 1 > MAX_NUMBER_LENGTH) {
      alert(MESSAGES.MAX_LENGTH);
      return;
    }

    if (!!result && !operation) {
      resetState();
    }

    state.clickedDigits[hasOperation] = Number(
      state.clickedDigits[hasOperation] + digit
    );

    displayState();
  };

  const addOperation = operation => {
    if (operation !== OPERATIONS.CALCULATE) {
      if (!!state.clickedDigits[1] && state.operation) {
        calculateDigits();
      }

      state.operation = operation;
    }
    displayState();
  };

  const calculateDigits = () => {
    const result = ComputedData(
      state.operation,
      state.clickedDigits[0],
      state.clickedDigits[1]
    );
    resetState();
    state.clickedDigits[0] = result;
    state.result = result;
    return result;
  };

  const resetState = () => {
    state.clickedDigits = [0, 0];
    state.operation = "";
    state.result = "";
  };

  const onClickAC = () => {
    $modifier.addEventListener("click", e => {
      resetState();
      displayState();
    });
  };

  const displayState = () => {
    Display({ state });
  };

  render();
}
