describe('블랙 커피 LV2, step 1 계산기 미션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다. (1+1)', () => {
    cy.get('.digits').contains('1').click();
    cy.get('.operations').contains('+').click();
    cy.get('.digits').contains('1').click();
    cy.get('#total').should('have.text', '1+1');

    cy.get('.operations').contains('=').click();
    cy.get('#total').should('have.text', '2');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다. (55-5)', () => {
    cy.get('.digits').contains('5').click();
    cy.get('.digits').contains('5').click();
    cy.get('.operations').contains('-').click();
    cy.get('.digits').contains('5').click();
    cy.get('#total').should('have.text', '55-5');

    cy.get('.operations').contains('=').click();
    cy.get('#total').should('have.text', '50');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다. (999X0)', () => {
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.get('.digits').contains('9').click();
    cy.get('.operations').contains('X').click();
    cy.get('.digits').contains('0').click();
    cy.get('#total').should('have.text', '999X0');

    cy.get('.operations').contains('=').click();
    cy.get('#total').should('have.text', '0');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다. (56/7)', () => {
    cy.get('.digits').contains('5').click();
    cy.get('.digits').contains('6').click();
    cy.get('.operations').contains('/').click();
    cy.get('.digits').contains('7').click();
    cy.get('#total').should('have.text', '56/7');

    cy.get('.operations').contains('=').click();
    cy.get('#total').should('have.text', '8');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.digits').contains('5').click();
    cy.get('.digits').contains('6').click();
    cy.get('.operations').contains('/').click();
    cy.get('.digits').contains('7').click();
    cy.get('#total').should('have.text', '56/7');

    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('.digits').contains('1').click();
    }

    cy.get('#total').should('have.text', '111');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다. (59/9)', () => {
    cy.get('.digits').contains('5').click();
    cy.get('.digits').contains('9').click();
    cy.get('.operations').contains('/').click();
    cy.get('.digits').contains('9').click();
    cy.get('#total').should('have.text', '59/9');

    cy.get('.operations').contains('=').click();
    cy.get('#total').should('not.have.text', '.');
  });
});
