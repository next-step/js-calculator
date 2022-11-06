function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return [].filter.call(elements, (element) => {
    return element.textContent === String(text);
  });
}

export default contains;
