import Calculator from "./Calculator.js"

export default class Expression {

    calculator;
    operands;
    operator;

    constructor() {
        this.calculator= new Calculator();
        this.clear();
    }

    getOperand(operand){
        console.log(`${this.operands} | ${this.operator} | ${this.result}`);

        this.operands.push(parseInt(operand))
        return this.getExpression();
    }

    getOperator(operator){
        console.log(`${this.operands} | ${this.operator} | ${this.result}`);
        if(this.calculator.isOperator(operator)){
            this.operator = operator;
            return this.getExpression();
        }

        this.result = this.calculator.calculate(this.operator, this.operands[0], this.operands[1]);
        return this.getResult();
    }

    clear(){
        this.operands=[];
        this.operator=null;
        this.result=null;
    }

    getResult(){
        return this.result;
    }

    getExpression() {
        return `${this.operands[0]} ${this.operator} ${this.operands[1]}`;
    }
}

