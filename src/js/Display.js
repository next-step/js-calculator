export default function Display({ state }) {
  const { clickedDigits, operation } = state;
  let newState = [];
  if (!clickedDigits[0] && !operation) {
    total.textContent = clickedDigits[0];
    return;
  }

  if (!!clickedDigits[1]) {
    newState = [clickedDigits[0], operation, clickedDigits[1]];
  } else {
    newState = [clickedDigits[0], operation];
  }
  total.textContent = newState.join("");
}
