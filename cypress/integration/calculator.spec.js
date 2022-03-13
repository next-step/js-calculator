describe('성공 테스트', () => {
  beforeEach(() => cy.visit('../../dist/index.html'));

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.contains('3').click();
    cy.contains('+').click();
    cy.contains('4').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 7);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.contains('9').click();
    cy.contains('-').click();
    cy.contains('1').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 8);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.contains('3').click();
    cy.contains('X').click();
    cy.contains('4').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 12);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.contains('3').click();
    cy.contains('/').click();
    cy.contains('4').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 0.75);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.contains('3').click();
    cy.contains('/').click();
    cy.contains('4').click();
    cy.contains('=').click();
    cy.contains('AC').click();
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.contains('1').click();
    cy.contains('2').click();
    cy.contains('3').click();
    cy.contains('+').click();
    cy.contains('4').click();
    cy.contains('5').click();
    cy.contains('6').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 579);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.contains('3').click();
    cy.contains('/').click();
    cy.contains('7').click();
    cy.contains('=').click();
    cy.get('#total').should('have.text', 0.428);
  });
});
