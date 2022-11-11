export const addNumberClickEventListener = (callback) => {
  const digitParent = document.querySelector('.digits');
  digitParent.addEventListener('click', callback);
};

export const addOperationClickEventListener = (callback) => {
  const operationParent = document.querySelector('.operations');
  operationParent.addEventListener('click', callback);
};

export const addACClickEventListener = (callback) => {
  const reset = document.querySelector('.modifier');
  reset.addEventListener('click', callback);
};
