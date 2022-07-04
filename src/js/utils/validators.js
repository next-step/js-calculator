export const isButtonElement = (element) => {
  return element instanceof HTMLButtonElement;
};

export const hasClassName = (element, className) => {
  return element.classList.contains(className);
};

export const isButtonHasClassName = (element, className) => {
  return isButtonElement(element) && hasClassName(element, className);
};
