// - [ ] 2개의 숫자에 대해 덧셈이 가능하다.
// - [ ] 2개의 숫자에 대해 뺄셈이 가능하다.
// - [ ] 2개의 숫자에 대해 곱셈이 가능하다.
// - [ ] 2개의 숫자에 대해 나눗셈이 가능하다.
// - [ ] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// - [ ] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// - [ ] 계산 결과를 표현할 때 소수점 이하는 버림한다.

describe('숫자를 입력하면 화면에 보인다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');

  cy.get('.digit').contains('7').click();

  cy.get('.digit').contains('8').click();

  cy.get('.digit').contains('9').click();
 });

 it('숫자 버튼들이 존재한다.', () => {
  cy.get('.digit').should('have.length', 10);
 });

 it('숫자 버튼을 연속해서 클릭하면 숫자가 입력된다.', () => {
  cy.get('#total').contains('789');
 });

 it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
  cy.get('.digit').contains('0').click();

  cy.get('#total').should('have.text', '789');
 });

 it('AC(All Clear)버튼이 존재한다.', () => {
  cy.get('.modifier').should('exist');
 });

 it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
  cy.get('.modifier').click();

  cy.get('#total').should('have.text', '0');
 });
});

describe('2개의 숫자에 대해 덧셈이 가능하다', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');

  cy.get('.digit').contains('7').click();

  cy.get('.digit').contains('8').click();
 });

 it('연산 버튼들이 존재한다.', () => {
  cy.get('.operation').should('have.length', 5);
 });

 it('덧셈 연산 버튼을 누르고 숫자를 눌렀을 때는 새롭게 숫자를 입력한다.', () => {
  cy.get('.operation').contains('+').click();
  cy.get('.digit').contains('2').click();
  cy.get('#total').should('have.text', '2');
 });

 it('등호 연산버튼을 눌렀을 때 덧셈 계산 결과가 나와야한다.', () => {
  cy.get('.operation').contains('+').click();
  cy.get('.digit').contains('2').click();
  cy.get('.operation').contains('=').click();
  cy.get('#total').should('have.text', '80');
 });
});
