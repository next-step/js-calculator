export default class Calculator {
    static EQUAL = '=';

    static operators={
        '/': (operand1, operand2) => operand1 / operand2,
        'X': (operand1, operand2) => operand1 * operand2,
        '+': (operand1, operand2) => operand1 + operand2,
        '-': (operand1, operand2) => operand1 - operand2,
    }

    isOperator(input){
        return Calculator.operators[input]!=null;
    }

    calculate(operator, operand1, operand2){
        return Calculator.operators[operator](operand1,operand2);
    }
}
