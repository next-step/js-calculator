export default function CalculatorPad(app) {
  this.pad = document.querySelector(".calculator");

  const onClick = (event) => {
    select(app, event);    
  };

  this.pad.addEventListener("click", onClick);
}



function select(app, event) {
  const value = event.target.textContent;

  const category = {
    digit: () => app.operand(value),
    operation: () => operator[value](),
    modifier: () => app.modify()
  }

  const operator = {
    '=': () => app.operate(), 
    '+': () => app.operator(value),
    '-': () => app.operator(value),
    '/': () => app.operator(value),
    'X': () => app.operator(value)
  }
  
  category[event.target.className]();
}