export const $ = (selector) => document.querySelector(selector);

export const beforeunload = (callback) => {
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    callback();
  });
};
