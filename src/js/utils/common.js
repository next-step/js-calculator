export const range = (size, callback = null) =>
  Array.from({ length: size }, (i) => (callback ? callback(i) : i));

export const isEmptyArray = (arr) => arr.length === 0;

export const isNull = (value) => value === null;
