const isValidForZero = ({ inputText, totalInnerText, hasOperator }) => {
  const isZeroRemain = totalInnerText === '0';
  if (isZeroRemain && inputText === '0') {
    return false;
  }
  if (hasOperator && inputText === '0') {
    return false;
  }
  return true;
};

const isValidForDigits = ({ savedOperator, totalInnerText }) => {
  if (!savedOperator && totalInnerText.length === 3) {
    return false;
  }
  if (savedOperator) {
    const indexOfOperator = totalInnerText.indexOf(savedOperator);
    if (totalInnerText.slice(indexOfOperator + 1).length === 3) {
      return false;
    }
  }
  return true;
};

export { isValidForDigits, isValidForZero };
