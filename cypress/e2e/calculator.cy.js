import Calculator from '../../src/js/index.js';

describe('Calculator', function () {
    const calculator = new Calculator();

    it('add numbers', () => {
        const result = calculator.add(2,3);
        expect(5).to.equal(result);
    })
    it('substract numbers', () => {
        const result = calculator.subtract(2,3);
        expect(-1).to.equal(result);
    })
    it('multiply numbers', () => {
        const result = calculator.multiply(3,4);
        expect(12).to.equal(result);
    })
    it('division numbers', () => {
        const result = calculator.division(3,4);
        expect(0).to.equal(result);
    })
})