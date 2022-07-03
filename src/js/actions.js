// Action
// Dispatcher에서 콜백 함수가 실행 되면 Store가 업데이트 되게 되는데,
// 이 콜백 함수를 실행 할 때 데이터가 담겨 있는 객체가 인수로 전달 되어야 합니다.
// 이 전달 되는 객체를 Action이라고 하는데, Action은 대채로 액션 생성자(Action creator)에서 만들어집니다.

export const SET_TOTAL = 'calculator/SET_TOTAL';
export const SET_NUMBER_A = 'calculator/SET_NUMBER_A';
export const SET_NUMBER_B = 'calculator/SET_NUMBER_B';
export const SET_OPERATION = 'calculator/SET_OPERATION';

export const setTotal = (payload) => ({ type: SET_TOTAL, payload });
export const setNumberA = (payload) => ({ type: SET_NUMBER_A, payload });
export const setNumberB = (payload) => ({ type: SET_NUMBER_B, payload });
export const setOperation = (payload) => ({ type: SET_OPERATION, payload });
