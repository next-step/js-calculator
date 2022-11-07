import Calculator from '../../src/js/Calculator.js';
import {validator} from '../../src/js/utils/validator.js';

describe('Calculator', function () {
    const calculator = new Calculator();
    calculator.number1 = 4;
    calculator.number2 = 3;

    it('add numbers', () => {
        const result = calculator.add();
        expect(7).to.equal(result);
    })
    it('substract numbers', () => {
        const result = calculator.subtract();
        expect(1).to.equal(result);
    })
    it('multiply numbers', () => {
        const result = calculator.multiply();
        expect(12).to.equal(result);
    })
    it('division numbers', () => {
        const result = calculator.division();
        expect(1).to.equal(result);
    })
    it('clear all', () => {
        calculator.clear();
        expect(calculator.total).to.equal('0');
    })
    it('validat 0 to 3 digits number', () => {
        const result = validator(123);
        expect(result).to.be.true;
    })
    it('fails if number over 3 digits', () => {
        const result = validator(1234);
        expect(result).to.be.false;
    })
})