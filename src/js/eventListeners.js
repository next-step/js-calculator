export const addNumberClickEventListener = (callback) => {
  const digits = document.querySelectorAll('.digit');
  digits.forEach((el) => el.addEventListener('click', callback));
};

export const addOperationClickEventListener = (callback) => {
  const operations = document.querySelectorAll('.operation');
  operations.forEach((el) => el.addEventListener('click', callback));
};

export const addACClickEventListener = (callback) => {
  const reset = document.querySelector('.modifier');
  reset.addEventListener('click', callback);
};
