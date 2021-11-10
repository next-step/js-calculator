const TEST_URL = 'http://127.0.0.1:5500/';

describe('계산기', () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('숫자 버튼을 누르면 결과화면에 나타난다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('#total').should('have.text', '1');
  });
});
