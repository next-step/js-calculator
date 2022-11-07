class Calculator {
    total;
    number1;
    number2;
    operation;
    constructor(){
        this.clear();
    }
    clear() {
      this.total = "0";
      this.number1 = 0;
      this.number2 = 0;
      this.operation = "";
    }
    add() {
      return this.number1 + this.number2;
    }
    subtract() {
      return this.number1 - this.number2;
    }
    multiply() {
      return this.number1 * this.number2;
    }
    division() {
      return Math.floor(this.number1 / this.number2);
    }
    setTotal(clickedValue){
        if(this.total === '0'){
            this.total = "";
        }
        this.total += clickedValue;
    }
    setResult(result){
        this.total = result;
        this.operation = "";
        this.number1 = this.total;
        this.number2 = 0;
    }
  }
  
  
  export default Calculator;
  
  