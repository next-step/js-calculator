import Calculate from '../../src/js/calculate';

describe('사칙 연산 테스트', () => {
 const calculate = new Calculate();
 it('plus', () => {
  expect(calculate.plus(1, 1)).to.equal(2);
 });
 it('minus', () => {
  expect(calculate.minus(2, 1)).to.equal(1);
 });
 it('multiple', () => {
  expect(calculate.multiple(3, 3)).to.equal(9);
 });
 it('divide', () => {
  expect(calculate.divide(28, 2)).to.equal(14);
 });
});
