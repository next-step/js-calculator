import {
  isDigitValidation,
  isOperationValidation,
} from './functions/validations/index.js';
import {
  setEnterTextInElement,
  setDigitGroup,
} from './functions/inputs/index.js';

const nodeListEventBind = (elements, event, handler) => {
  elements.forEach((element) => element.addEventListener(event, handler));
};

const init = ({
  ViewElement,
  AllClearElement,
  digitElements,
  operationElements,
}) => {
  const digitTextArray = [];
  const operationTextArray = [];
  let enterDigitGroup = '';

  const digitHandler = (event) => {
    const digitInnerText = event.target.innerText;

    if (isDigitValidation(enterDigitGroup)) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');
      return;
    }

    enterDigitGroup = setDigitGroup(enterDigitGroup, digitInnerText);

    setEnterTextInElement(ViewElement, digitInnerText);
  };

  const operationHandler = (event) => {
    const operationInnerText = event.target.innerText;

    if (isOperationValidation(enterDigitGroup)) {
      alert('중첩해서 기호를 사용할 수 없습니다.');
      return;
    }

    enterDigitGroup = setDigitGroup();

    setEnterTextInElement(ViewElement, operationInnerText);
  };

  const modifierHandler = () => {
    console.log('modifier');
  };

  nodeListEventBind(digitElements, 'click', digitHandler);
  nodeListEventBind(operationElements, 'click', operationHandler);
  AllClearElement.addEventListener('click', modifierHandler);
};

export default init;
