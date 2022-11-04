import Calculator from '../../src/js/Calculator';

describe('계산기 Class 테스트', () => {
  const calculator = new Calculator();

  it('덧셈', () => {
    expect(calculator.add(2, 4)).to.equal(6);
  });

  it('뺄셈', () => {
    expect(calculator.subtract(2, 4)).to.equal(-2);
  });

  it('곱셈', () => {
    expect(calculator.multiply(2, 4)).to.equal(8);
  });

  it('나눗셈', () => {
    // 나머지 없는 숫자로 먼저 판단하기
    expect(calculator.divide(4, 2)).to.equal(2);
  });
});
