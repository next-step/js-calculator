/* eslint-disable no-undef */
describe('DOM Test', () => {
  const URL = 'http://localhost:5500';
  const visit = () => cy.visit(URL);
  const press = {
    number: (num) => cy.get('.digit').contains(num).click(),
    operation: (op) => cy.get('.operation').contains(op).click(),
    modifier: () => cy.get('.modifier').contains('AC').click(),
  };
  const verify = (value = '') => {
    cy.get('#total').should((property) => {
      expect(property).to.contain(value);
    });
  };

  beforeEach(() => {
    visit();
  });

  it('0 나누기 예외처리', () => {
    press.number('9');
    press.operation('/');
    press.number('0');
    press.operation('=');

    verify('숫자 아님');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다', () => {
    press.number('1');
    press.number('2');
    press.number('3');
    press.number('4');
    press.number('5');

    verify('123');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    press.number('1');
    press.number('2');
    press.modifier();

    verify('0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    press.number('1');
    press.number('2');
    press.operation('+');
    press.number('2');
    press.number('4');
    press.operation('=');

    verify('36');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    press.number('2');
    press.number('1');
    press.operation('-');
    press.number('8');
    press.number('4');
    press.operation('=');

    verify('-63');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    press.number('2');
    press.number('1');
    press.operation('X');
    press.number('9');
    press.operation('=');

    verify('189');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    press.number('8');
    press.number('1');
    press.operation('/');
    press.number('9');
    press.operation('=');

    verify('9');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    press.number('9');
    press.number('1');
    press.operation('/');
    press.number('9');
    press.operation('=');

    verify('10');
  });
});
