const makeListener = (selector, callback) => {
  const elements = document.querySelectorAll(selector) || [];
  elements.forEach((element) => element.addEventListener('click', callback));
};

export default makeListener;
