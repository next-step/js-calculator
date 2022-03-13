function calculate(formula) {
  return String(Math.floor(new Function(`return ${formula}`)()));
}

function getReplacedFormulaAboutMultiplication(formula) {
  return formula.replace(/X/g, '*');
}

export function getNewTotal(formula) {
  return calculate(getReplacedFormulaAboutMultiplication(formula));
}
