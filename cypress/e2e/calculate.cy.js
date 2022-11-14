Cypress.Commands.add('typeNumber', (numbers) => {
 for (const number of numbers) {
  cy.get('.digit').contains(number).click();
 }
});

Cypress.Commands.add('operate', (operator, nextNumber) => {
 cy.get('.operation').contains(operator).click();
 cy.typeNumber(nextNumber);
});

describe('숫자를 입력하면 화면에 보인다.', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');
  cy.typeNumber(['7', '8', '9']);
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

describe('2개의 숫자에 대해 뺄셈이 가능하다', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');

  cy.typeNumber(['7', '8']);
  cy.operate('-', ['2']);
 });

 it('뺄셈 연산 버튼을 누르고 숫자를 눌렀을 때는 새롭게 숫자를 입력한다.', () => {
  cy.get('#total').should('have.text', '2');
 });

 it('등호 연산버튼을 눌렀을 때 계산 결과가 나와야한다.', () => {
  cy.get('.operation').contains('=').click();
  cy.get('#total').should('have.text', '76');
 });
});

describe('2개의 숫자에 대해 곱셈이 가능하다', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');

  cy.typeNumber(['7', '8']);
  cy.operate('X', ['2']);
 });

 it('곱셈 연산 버튼을 누르고 숫자를 눌렀을 때는 새롭게 숫자를 입력한다.', () => {
  cy.get('#total').should('have.text', '2');
 });

 it('등호 연산버튼을 눌렀을 때 곱셈 계산 결과가 나와야한다.', () => {
  cy.get('.operation').contains('=').click();
  cy.get('#total').should('have.text', '156');
 });
});

describe('2개의 숫자에 대해 나누셈이 가능하다', () => {
 beforeEach(() => {
  cy.visit('http://localhost:3000');
  cy.typeNumber(['7', '8']);
 });

 it('나누셈 연산 버튼을 누르고 숫자를 눌렀을 때는 새롭게 숫자를 입력한다.', () => {
  cy.operate('/', ['2']);
  cy.get('#total').should('have.text', '2');
 });

 it('등호 연산버튼을 눌렀을 때 계산 결과가 나와야한다.', () => {
  cy.operate('/', ['2']);
  cy.get('.operation').contains('=').click();
  cy.get('#total').should('have.text', '39');
 });

 it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
  cy.operate('/', ['5']);
  cy.get('.operation').contains('=').click();
  cy.get('#total').should('have.text', '15');
 });
});
