describe('DOM Test', () => {
  const URL = 'http://localhost:5500';
  const visit = () => cy.visit(URL);
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.contains('12');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.contains('12');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('4').click();
    cy.get('.digit').contains('5').click();
    cy.contains('123');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.modifier').contains('AC').click();

    cy.contains('0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();

    cy.contains('36');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    visit();

    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('8').click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();

    cy.contains('-63');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    visit();

    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('X').click();
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('=').click();

    cy.contains('189');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    visit();

    cy.get('.digit').contains('8').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('=').click();

    cy.contains('9');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    visit();

    cy.get('.digit').contains('9').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('=').click();

    cy.contains('10');
  });
});
