import Event from "../Abstract/Event.js";
import Digit from "../Component/Digit.js";
import Calculator from "../Component/Calculator.js";
import Modifier from "../Component/Modifier.js";

class KeypadEvent extends Event {
  constructor(target, type) {
    super(target, type)
    this.target.addEventListener(this.type, (event) => {
      const isDigit = event.target.classList.contains('digit')
      if (isDigit) new Digit(this.target)
    
      const isOperation = event.target.classList.contains('operation')
      if (isOperation) new Calculator(this.target)
    
      const isModifier = event.target.classList.contains('modifier')
      if (isModifier) new Modifier(this.target)
    })
  }
}

export default KeypadEvent;
