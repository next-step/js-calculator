import { Calculator } from '/src/js/calculator';

describe('visit', () => {
  const calculator = new Calculator();

  it('sum', () => {
    expect(calculator.sum(1, 2)).to.equal(3);
  })

  it('subtract', () => {
    expect(calculator.subtract(6, 4)).to.equal(2);
  })

  it('divide', () => {
    expect(calculator.divide(10, 2)).to.equal(5);
  })

  it('multiply', () => {
    expect(calculator.multiply(2, 4)).to.equal(8);
  })
})