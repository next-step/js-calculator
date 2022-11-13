export const $ = (selector, element) => {
  if (element != null) {
    return element.querySelector(selector);
  }

  return document.querySelector(selector);
};
