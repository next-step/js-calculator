export function isNumber(value) {
  return typeof value === 'number';
}

export function isNodeContains(parentNode, targetNode) {
  return parentNode.contains(targetNode);
}
export function isOver(max, target) {
  if (target.length > max) {
    return true;
  }

  return false;
}
