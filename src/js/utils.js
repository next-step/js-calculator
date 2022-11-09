export function isNumber(value) {
  return typeof value === 'number';
}

export function isOverMaxLength(max, target) {
  return target.length > max;
}
