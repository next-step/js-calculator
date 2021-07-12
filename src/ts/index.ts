import { digitClickHandler, modifierClickHandler, operationClickHandler } from './handlers.js';
import { ButtonClass, Selector } from './constants.js';
import { $ } from './util.js';

/**
 * DOM
 */
const $calculator = $(Selector.Calculator)!;
const $result = $(Selector.Result, $calculator)!;

/**
 * 클릭 이벤트 리스너
 */
function handleClickButton(evt: MouseEvent) {
  const target = evt?.target as HTMLElement;
  const classList = target?.classList;

  if (!classList) return;

  if (classList.contains(ButtonClass.Digit)) {
    digitClickHandler.handle(target, $result);
  } else if (classList.contains(ButtonClass.Operation)) {
    operationClickHandler.handle(target, $result);
  } else if (classList.contains(ButtonClass.Modifier)) {
    modifierClickHandler.handle($result);
  }
}

$calculator.addEventListener('click', handleClickButton);
