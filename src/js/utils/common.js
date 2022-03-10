export const range = (size, callback = null) =>
  Array.from({ length: size }, (i) => (callback ? callback(i) : i));
