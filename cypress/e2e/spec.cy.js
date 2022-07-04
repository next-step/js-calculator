describe('계산기 테스트', () => {
  it('계산기 데모 페이지로 이동', () => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digit').contains('9').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('1').click();

    cy.get('#total').should('have.text', '9+1');

    cy.get('.operation').contains('=').click();

    cy.get('#total').should('have.text', '10');
  });
});
