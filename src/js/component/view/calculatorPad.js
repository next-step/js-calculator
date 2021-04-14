export default function CalculatorPad(app) {
  this.pad = document.querySelector(".calculator");

  const onClick = (event) => {
    select(app, event);    
  };

  this.pad.addEventListener("click", onClick);
}



function select(app, event) {
  const text = event.target.textContent;

  const category = {
    digit: () => app.operand(text),
    operation: () => operator[text](),
    modifier: () => app.modify()
  }

  const operator = {
    '=': () => app.operate(), 
    '+': () => app.operator(text),
    '-': () => app.operator(text),
    '/': () => app.operator(text),
    'X': () => app.operator(text)
  }
  
  category[event.target.className]();
}