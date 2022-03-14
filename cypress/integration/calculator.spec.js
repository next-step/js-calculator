const clickNumber = (num) => cy.get('.digits').contains(num).click();
const clickOperation = (oper) => cy.get('.operations').contains(oper).click();
const clickAllClear = () => cy.get('.modifiers').contains('AC').click();
const checkTotal = (value) => cy.get('#total').should('have.text', value);

const calculate = (prev, operator, next, total) => {
  [...prev.toString()].forEach((p) => clickNumber(p));
  clickOperation(operator);
  [...next.toString()].forEach((p) => clickNumber(p));
  clickOperation('=');
  checkTotal(total);

  return total;
};

before(() => cy.visit('../../dist/index.html'));

describe('요구사항 테스트', () => {
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    calculate(3, '+', 4, 7);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    calculate(9, '-', 1, 8);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    calculate(3, 'X', 4, 12);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    calculate(3, '/', 4, 0);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    calculate(3, '-', 1, 2);
    clickAllClear();
    checkTotal(0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    calculate(123, '+', 456, 579);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    calculate(31, '/', 7, 4);
  });
});

describe('추가사항 테스트', () => {
  it('연속적인 연산이 가능하다.', () => {
    const total = calculate(123, '+', 456, 579);
    calculate(total, '-', 789, -210);
  });

  it('마지막 값이 연산자인 경우에도 연산이 가능하다.', () => {
    clickNumber(9);
    clickOperation('-');
    clickNumber(1);
    clickOperation('+');
    clickOperation('=');
    checkTotal(8);
  });

  it('연산 이후 값을 입력하면 새로운 연산과정을 할 수 있다.', () => {
    calculate(3, 'X', 4, 12);
    calculate(99, '-', 88, 11);
  });

  it('연산 이후 연산자를 입력하면 새로운 연산과정을 할 수 있다.', () => {
    calculate(3, 'X', 4, 12);

    clickOperation('-');
    clickNumber(8);
    clickOperation('=');
    checkTotal(4);
  });

  it('0을 입력 후 연산과정을 할 수 있다.', () => {
    clickNumber(0);

    calculate(3, 'X', 4, 12);

    clickOperation('-');
    clickNumber(8);
    clickOperation('=');
    checkTotal(4);
  });
});
