import Operator from "./operator.js";

export default function Value(value=0) {
    this.value = value;
    
    const delimiter = /([0-9]+)([-+\/X])([0-9]+)/;

    this.concat = input => {
        if (this.value != 0) {
            this.value += input;
        }
        
        if (this.value == 0) {
            this.value = input;
        }
    }

    this.calculate = () => {
      while (this.value.match(delimiter) !== null) {
        const [total, operand1, operator, operand2] = this.value.match(delimiter);
        const result = Operator(operator, operand1, operand2);
        this.value = result + this.value.slice(total.length + 1, );
      }
      this.value = this.value.replace(/[-+\/X]/, "");
    }

}