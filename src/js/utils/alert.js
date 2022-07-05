export const alertOnError = (eventHandler, event) => {
  try {
    eventHandler(event);
  } catch (e) {
    window.alert(e.message);
  }
};
