export const qs = (target, dom = document) => dom.querySelector(target);
export const qsAll = (target, dom = document) => dom.querySelectorAll(target);

// NOTE: capture 는 뭐지>
export const $on = (target, type, callback) => {
  target.addEventListener(type, callback);
};
