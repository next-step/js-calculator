export default function Display({ state }) {
  const { clickedDigits, operation, result } = state;
  let newState = [];
  if (!clickedDigits[0] && result) {
    total.innerText = result;
    return;
  }
  if (!!clickedDigits[1]) {
    newState = [clickedDigits[0], operation, clickedDigits[1]];
  } else {
    newState = [clickedDigits[0], operation];
  }
  total.innerText = newState.join("");
}
