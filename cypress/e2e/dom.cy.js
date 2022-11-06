describe('DOM Test', () => {
  const URL = 'http://localhost:5500';
  const visit = () => cy.visit(URL);
  const press = {
    number: (num) => cy.get('.digit').contains(num).click(),
    operation: (op) => cy.get('.operation').contains(op).click(),
    modifier: () => cy.get('.modifier').contains('AC').click(),
  };

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다', () => {
    visit();

    press.number('1');
    press.number('2');
    press.number('3');
    press.number('4');
    press.number('5');

    cy.contains('123');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    visit();

    press.number('1');
    press.number('2');
    press.modifier();

    cy.contains('0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    visit();

    press.number('1');
    press.number('2');
    press.operation('+');
    press.number('2');
    press.number('4');
    press.operation('=');

    cy.contains('36');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    visit();

    press.number('2');
    press.number('1');
    press.operation('-');
    press.number('8');
    press.number('4');
    press.operation('=');

    cy.contains('-63');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    visit();

    press.number('2');
    press.number('1');
    press.operation('X');
    press.number('9');
    press.operation('=');

    cy.contains('189');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    visit();

    press.number('8');
    press.number('1');
    press.operation('/');
    press.number('9');
    press.operation('=');

    cy.contains('9');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    visit();

    press.number('9');
    press.number('1');
    press.operation('/');
    press.number('9');
    press.operation('=');

    cy.contains('10');
  });
});
