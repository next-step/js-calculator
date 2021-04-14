export default function CalculatorPad(app) {
  this.pad = document.querySelector(".calculator");

  const onClick = (event) => {
    const value = event.target.textContent;
    if(isdigit(event)) {
      app.operand(value);
    }
    if(isOperation(event)) {
      app.operator(value);
    }
    
  };

  this.pad.addEventListener("click", onClick);
}

function isdigit(e) {
  return e.target.className === "digit";
}

function isOperation(e) {
  return e.target.className === "operation";
}

function isModifier(e) {
  return e.target.className === "modifier";
}