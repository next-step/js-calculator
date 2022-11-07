import Calculator from '../../src/js/calculator.js';

describe('계산기 기본 기능', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('더하기', () => {
    cy.contains('.digit', '1').click();
    cy.contains('.operation', '+').click();
    cy.contains('.digit', '1').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '2');
  });

  it('빼기', () => {
    cy.contains('.digit', '1').click();
    cy.contains('.operation', '-').click();
    cy.contains('.digit', '1').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '0');
  });

  it('빼기 (음수 결과)', () => {
    cy.contains('.digit', '1').click();
    cy.contains('.operation', '-').click();
    cy.contains('.digit', '3').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '-2');
  });
  it('곱하기', () => {
    cy.contains('.digit', '1').click();
    cy.contains('.digit', '0').click();
    cy.contains('.operation', 'X').click();
    cy.contains('.digit', '2').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '20');
  });

  it('나누기', () => {
    cy.contains('.digit', '4').click();
    cy.contains('.operation', '/').click();
    cy.contains('.digit', '2').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '2');
  });

  it('나누기 (소수점 버림)', () => {
    cy.contains('.digit', '7').click();
    cy.contains('.operation', '/').click();
    cy.contains('.digit', '2').click();
    cy.contains('.operation', '=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('AC 버튼 클릭 시 값 초기화', () => {
    cy.get('#total').invoke('text', '100');
    cy.contains('AC').click();
    cy.get('#total').should('have.text', '0');
  });
});

describe('숫자 입력 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('최대 3자리 수까지 입력, 첫 번째 수의 경우', () => {
    cy.contains('.digit', '1').click();
    cy.contains('.digit', '0').click();
    cy.contains('.digit', '9').click();
    cy.contains('.digit', '8').click();
    cy.get('#total').should('have.text', '109');
  });

  it('최대 3자리 수까지 입력, 두 번째 수의 경우', () => {
    cy.contains('.operation', '+').click();
    cy.contains('.digit', '2').click();
    cy.contains('.digit', '9').click();
    cy.contains('.digit', '8').click();
    cy.contains('.digit', '1').click();
    cy.get('#total').should('have.text', '298');
  });

  it('0 중복 입력 방지, 첫 번째 수의 경우', () => {
    cy.contains('.digit', '0').click();
    cy.contains('.digit', '0').click();
    cy.contains('.digit', '1').click();
    cy.get('#total').should('have.text', '1');
  });

  it('0 중복 입력 방지, 두 번째 수의 경우', () => {
    cy.contains('.operation', '+').click();
    cy.contains('.digit', '0').click();
    cy.contains('.digit', '0').click();
    cy.contains('.digit', '2').click();
    cy.get('#total').should('have.text', '2');
  });
});
