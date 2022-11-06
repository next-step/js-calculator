import Calculator from '../../src/js/calculator.js';

describe('계산기 테스트', () => {
  const calculator = new Calculator();

  it('더하기', () => {
    expect(calculator.sum(1, 2)).equal(3);
  });

  it('빼기', () => {
    expect(calculator.subtract(1, 2)).equal(-1);
    expect(calculator.subtract(2, 2)).equal(0);
  });

  it('곱하기', () => {
    expect(calculator.multiple(1, 2)).equal(2);
    expect(calculator.multiple(-1, 2)).equal(-2);
  });

  it('나누기', () => {
    expect(calculator.divide(1, 2)).equal(0.5);
    expect(calculator.divide(4, 2)).equal(2);
  });
});
