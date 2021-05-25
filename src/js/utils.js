export const addEvent = (target, eventType, selector, callback) => {
  const children = [...target.querySelectorAll(selector)];
  const isTarget = (target) => {
    return children.includes(target) || target.closest(selector);
  };
  target.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};
