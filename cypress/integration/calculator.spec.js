describe('계산기 초기 화면 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('total의 초기 값은 0이다.', () => {
    cy.get('#total').should('have.text', '0');
  });
});

describe('계산기 기능 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    cy.get('.digit').contains('5').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '8');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('7').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.get('.digit').contains('6').click();
    cy.get('.operation').contains('X').click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '24');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.get('.digit').contains('6').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '2');
  });
});
