import { subtract, add, mutiply, divide } from '../../src/js/operation';

describe('사칙연산 테스트', () => {
  it('덧셈', () => {
    expect(add(2, 3)).to.equal(5);
  });
  it('뺄셈', () => {
    expect(subtract(5, 3)).to.equal(2);
  });
  it('곱셈', () => {
    expect(mutiply(2, 3)).to.equal(6);
  });
  it('나눗셈', () => {
    expect(divide(6, 3)).to.equal(2);
  });
  it('나눗셈 버림', () => {
    expect(divide(5, 3)).to.equal(1);
  });
});
