export function isNumber(value) {
  return typeof value === 'number';
}

export function isNodeContains(parentNode, targetNode) {
  return parentNode.contains(targetNode);
}
