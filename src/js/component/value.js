import { deleteLastOperator, matchOperation, validNoNumber, validOverNumber } from "../util/stringUtil.js";
import Operator from "../module/operation.js";
import { Message } from "../util/Message.js";

export default function Value(value='0') {
    this.value = value;

  this.operand = input => {
    if (validOverNumber(this.value)) {
      this.concat(input);
    }
  }

  this.operator = input => {
    if (validNoNumber(this.value)) {
      alert(Message.ILLEGAL_INPUT_OPERATOR);
      return;
    }
    this.concat(input);
  }

  this.concat = input => {      
    if (validNoNumber(this.value)) {
      this.value = input;
      return;
    }  
    this.value += input;
  }

    this.calculate = () => {
      while (matchOperation(this.value) !== null) {
        const [total, operand1, operator, operand2] = matchOperation(this.value);
        const result = Operator(operator, operand1, operand2);
        this.value = result + this.value.slice(total.length + 1, );
      }
      this.value = deleteLastOperator(this.value); 
    }

}