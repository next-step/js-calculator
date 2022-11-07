const handleClick = {
  number: (num) => cy.get('.digit').contains(num).click(),
  operator: (op) => cy.get('.operation').contains(op).click(),
  clear: () => cy.get('.modifier').contains('AC').click(),
};
const getTotalValue = (text) => cy.get('#total').should('have.text', text);

beforeEach(() => {
  cy.visit('/');
});

describe('계산기 테스트', () => {
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('+');
    handleClick.number('2');
    handleClick.operator('=');
    getTotalValue('5');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('-');
    handleClick.number('2');
    handleClick.operator('=');
    getTotalValue('1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('X');
    handleClick.number('2');
    handleClick.operator('=');
    getTotalValue('6');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    handleClick.number('6');
    handleClick.operator('/');
    handleClick.number('2');
    handleClick.operator('=');
    getTotalValue('3');
  });

});
