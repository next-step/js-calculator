import { DISPLAY_ERROR, OPERATIONS_LABEL } from '../constants.js';
import useDisplay from '../hooks/useDisplay.js';

export default function operationHandler() {
  const { getDisplayNumbers, setDisplay, getDisplayOperator } = useDisplay();

  const operater = (x, y, operation) => {
    switch (operation) {
      case OPERATIONS_LABEL.DIV:
        if (y === 0) {
          alert('숫자를 0으로는 나눌 수 없습니다.');
          return DISPLAY_ERROR;
        }
        return Math.floor(x / y);
      case OPERATIONS_LABEL.MUL:
        return x * y;
      case OPERATIONS_LABEL.SUB:
        return x - y;
      case OPERATIONS_LABEL.ADD:
        return x + y;
      default:
        alert('시스템 오류가 있습니다. 다시 입력해주세요!');
        return DISPLAY_ERROR;
    }
  };

  const operaterHandler = () => {
    const displayOperation = getDisplayOperator();
    const [x, y] = getDisplayNumbers()
      .filter(number => number)
      .map(number => Number(number));

    if (x === undefined || y === undefined) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요.');
      return;
    }

    const result = operater(x, y, displayOperation);
    setDisplay(result);
  };

  const pushOperation = value => {
    const display = getDisplayNumbers() + value;
    setDisplay(display);
  };

  const onClick = event => {
    const displayOperation = getDisplayOperator();
    const value = event.target.textContent;

    if (value === OPERATIONS_LABEL.EQL) {
      operaterHandler();
      return;
    }

    if (displayOperation) {
      alert('연산자가 이미 존재합니다.');
      return;
    }

    pushOperation(value);
  };

  document.querySelectorAll('.operation').forEach($target =>
    $target.addEventListener('click', event => {
      onClick(event);
    })
  );
}
