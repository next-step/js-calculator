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
    digit: value => app.operand(value),
    operation: value => app.operator(value), 
    modifier: value => app.modify()
  }
  
  category[event.target.className](text);
}