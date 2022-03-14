/**
 * @name selector를 가져오는 함수
 * ```js
 * // 사용방법
 * const $root = getSelector('#root')
 * ```
 */
export const getSelector = (selector) => document.querySelector(selector);

/**
 * @name 이벤트위임 관련 함수
 *
 * ```js
 * // 사용방법
 * addEvent('click', '.digits button', handleClickDigit);
 * ```
 */
export const addEvent = (event, selector, callBackFn) => {
  const selectors = selector.split(' ');
  const parentEl = getSelector(selectors[0]);
  return parentEl.addEventListener(event, (e) => {
    const childEl = e.target.closest(selectors[1]);
    if (!childEl) return;

    callBackFn(e.target);
  });
};
