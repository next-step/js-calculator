const handleClickNumber = (...numbers) => numbers.forEach((number) => cy.get('.digit').contains(number).click());
const handleClickOperation = (operation) => cy.get('.operations').contains(operation).click();

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    handleClickNumber(2);
    handleClickOperation('+');
    handleClickNumber(1);
    handleClickOperation('=');
    cy.get('#total').should('have.text', '3');
  });
  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    handleClickNumber(2);
    handleClickOperation('-');
    handleClickNumber(1);
    handleClickOperation('=');
    cy.get('#total').should('have.text', '1');
  });
  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    handleClickNumber(2);
    handleClickOperation('X');
    handleClickNumber(1);
    handleClickOperation('=');
    cy.get('#total').should('have.text', '2');
  });
  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    handleClickNumber(2);
    handleClickOperation('/');
    handleClickNumber(1);
    handleClickOperation('=');
    cy.get('#total').should('have.text', '2');
  });
  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    handleClickNumber(2);
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    handleClickNumber(1, 2, 3, 4, 5);
    cy.get('#total').should('have.text', '123');
  });
  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    handleClickNumber(1);
    handleClickOperation('/');
    handleClickNumber(2);
    handleClickOperation('=');
    cy.get('#total').should('have.text', '0');
  });
});
