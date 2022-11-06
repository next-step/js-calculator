import Calculator from "../../src/js/Calculaotr";
import ERROR_MESSAGE from "../../src/const/ERROR_MESSAGE";

describe('계산기', () =>{

  const calculator = new Calculator();

  it('0개의 숫자를 받는 경우 에러를 던진다', () => {
    const actual = () => calculator.sum();
    expect(actual).to.throw(ERROR_MESSAGE.PARAM_MISSING);
  })

  it('1개의 숫자만 받는 경우 에러를 던진다', () => {
    const actual = () => calculator.sum(1);
    expect(actual).to.throw(ERROR_MESSAGE.PARAM_MISSING);
  })

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    expect(calculator.sum(1,2)).to.equal(3);
  })
  
  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    expect(calculator.abstract(1,2)).to.equal(-1);
  })

  it('2개의 숫자에 대해 곱셉이 가능하다.', () => {
    expect(calculator.multiply(1,2)).to.equal(2);
  })

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    expect(calculator.divide(1,2)).to.equal(0);
  })
})