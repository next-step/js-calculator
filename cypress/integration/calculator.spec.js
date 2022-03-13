describe('계산기 초기 화면 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });
  it('total의 초기 값은 0이다.', () => {
    cy.get('#total').should('have.text', '0');
  });
});
