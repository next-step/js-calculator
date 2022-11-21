function contains(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).filter(
    (element) => element.textContent === String(text)
  );
}

export default contains;
