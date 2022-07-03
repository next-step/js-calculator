import { DISPLAY_ERROR, MAX_NUM_COUNT } from '../constants.js';
import useDisplay from '../hooks/useDisplay.js';

export default function digitHandeler() {
  const { getDisplayNumbers, setDisplay, getDisplayOperator } = useDisplay();

  const pushNumber = value => {
    const array = getDisplayNumbers();
    const lastItem = array.slice(-1).pop();

    if (lastItem === DISPLAY_ERROR) {
      setDisplay(value);
      return;
    }

    if (lastItem.length >= MAX_NUM_COUNT) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');
      return;
    }

    const pushedNumber = Number(lastItem) ? lastItem + value : value;
    array.splice(-1, 1, pushedNumber);

    const total = array.join(getDisplayOperator());
    setDisplay(total);
  };

  const onClick = event => {
    const value = event.target.textContent;
    pushNumber(value);
  };

  document.querySelectorAll('.digit').forEach($target =>
    $target.addEventListener('click', event => {
      onClick(event);
    })
  );
}
