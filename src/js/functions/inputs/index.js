export const setEnterTextInElement = (element, text) => {
  const elementInnerText = element.innerText;
  const mergedText = elementInnerText + text;

  element.innerText = elementInnerText === '0' ? text : mergedText;
};

export const setDigitGroup = (DigitGroup = '', text = '') => {
  return DigitGroup + text;
};
