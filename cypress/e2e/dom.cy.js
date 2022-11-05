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

  it('덧셈 연산', () => {
    visit();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();

    cy.contains('36');
  });
});
