export const err = msg => {
  throw msg;
};
export const warn = msg => alert(msg);
export const qs = (sel, parent = document) => parent.querySelector(sel);
export const qsById = (id, parent) => qs(`#${id}`, parent);
export const values = obj => Object.values(obj);
export const floor = float => Math.floor(float);
export const evaluate = exp => eval(exp);
