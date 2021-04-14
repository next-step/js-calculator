import { validNoNumber, validOverNumber } from "../util/stringUtil.js";
import Operator from "./operator.js";

export default function Value(value='0') {
    this.value = value;
    
    const delimiter = /([0-9]+)([-+\/X])([0-9]+)/;

  this.operand = input => {
    if (validOverNumber(this.value)) {
      this.concat(input);
    }
  }

  this.operator = input => {
    if (validNoNumber(this.value)) {
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
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
      while (this.value.match(delimiter) !== null) {
        const [total, operand1, operator, operand2] = this.value.match(delimiter);
        const result = Operator(operator, operand1, operand2);
        this.value = result + this.value.slice(total.length + 1, );
      }
      this.value = this.value.replace(/(\d+)[-+\/X]/, "");
    }

}