describe('test calculator', () => {
  before(() => {
    cy.visit();
  });
  it('계산기 초기상태 값은 0', () => {
    cy.get('#total').should('have.text', '0');
  });

  it('2개의 숫자에 대해 덧셈', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 뺄셈', () => {
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', '2');
  });

  it('2개의 숫자에 대해 곱셈', () => {
    cy.get('.operation').contains('X').click();
    cy.get('.digit').contains('5').click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', '10');
  });

  it('2개의 숫자에 대해 나눗셈 (계산 결과를 표현할 때 소수점 이하는 버림한다.)', () => {
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', '3');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화', () => {
    cy.get('.modifier').click();

    cy.get('#total').should('have.text', '0');
  });

  it('계산기 3이상 눌렀을 경우', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('1').click();

    cy.alert('숫자는 세 자리까지만 입력 가능합니다!');
    cy.get('#total').should('have.text', '111');
  });

  it('0으로 나누기할 경우 ERROR 표시를 합니다.', () => {
    cy.get('.operation').contains('=').click();

    cy.alert('숫자를 먼저 입력한 후 연산자를 입력해주세요.');
    cy.get('#total').should('have.text', '111');
  });

  it('0으로 나누기할 경우 ERROR 표시를 합니다.', () => {
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains('=').click();

    cy.alert('숫자를 0으로는 나눌 수 없습니다.');
    cy.get('#total').should('have.text', 'ERROR');
  });

  it('ERROR 표시 이후, 숫자를 입력할 경우', () => {
    cy.get('.digit').contains('7').click();

    cy.get('#total').should('have.text', '7');
  });

  it('연산자가 있는데 연산을 또 할 경우 Alert 표시', () => {
    cy.get('.modifier').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();

    cy.alert('연산자가 이미 존재합니다.');
    cy.get('#total').should('have.text', '1+1');
  });
});
