import { digitClickHandler, modifierClickHandler, operationClickHandler } from './handlers.js';
import { $ } from './util.js';
/**
 * DOM
 */
const $calculator = $(".calculator" /* Calculator */);
const $result = $("#total" /* Result */, $calculator);
/**
 * 클릭 이벤트 리스너
 */
function handleClickButton(evt) {
    const target = evt?.target;
    const classList = target?.classList;
    if (!classList)
        return;
    if (classList.contains("digit" /* Digit */)) {
        digitClickHandler.handle(target, $result);
    }
    else if (classList.contains("operation" /* Operation */)) {
        operationClickHandler.handle(target, $result);
    }
    else if (classList.contains("modifier" /* Modifier */)) {
        modifierClickHandler.handle($result);
    }
}
$calculator.addEventListener('click', handleClickButton);
