const OPERATOR = {
  SUM: '+',
  SUBSTRACT: '-',
  MULTIPLY: 'X',
  DIVIDE: '/',
  ASSIGNMENT: '=',
};

/**
 * @todo 테스트 코드 작성
 * - [ ]  AC(All Clear)버튼을 누르면 0으로 초기화 한다.
 * - [ ]  숫자는 한번에 최대 3자리 수까지 입력 가능하다.
 * - [ ]  계산 결과를 표현할 때 소수점 이하는 버림한다.
 */

describe('계산기 테스트', () => {
  let OPERRATIONS = {};

  beforeEach(() => {
    cy.visit('/');
    cy.get('.operations > :nth-child(4)').as(OPERATOR.SUM);
    cy.get('.operations > :nth-child(3)').as(OPERATOR.SUBSTRACT);
    cy.get('.operations > :nth-child(2)').as(OPERATOR.MULTIPLY);
    cy.get('.operations > :nth-child(1)').as(OPERATOR.DIVIDE);
    cy.get('.operations > :nth-child(5)').as(OPERATOR.ASSIGNMENT);
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.get('.digits > :nth-child(5)').click();
    cy.get(`@${OPERATOR.SUM}`).click();
    cy.get('.digits > :nth-child(7)').click();
    cy.get(`@${OPERATOR.ASSIGNMENT}`).click();

    cy.get('#total').should('have.text', '8');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.get('.digits > :nth-child(5)').click();
    cy.get(`@${OPERATOR.SUBSTRACT}`).click();
    cy.get('.digits > :nth-child(7)').click();
    cy.get(`@${OPERATOR.ASSIGNMENT}`).click();

    cy.get('#total').should('have.text', '2');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.get('.digits > :nth-child(5)').click();
    cy.get(`@${OPERATOR.MULTIPLY}`).click();
    cy.get('.digits > :nth-child(7)').click();
    cy.get(`@${OPERATOR.ASSIGNMENT}`).click();

    cy.get('#total').should('have.text', '15');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.get('.digits > :nth-child(5)').click();
    cy.get(`@${OPERATOR.DIVIDE}`).click();
    cy.get('.digits > :nth-child(7)').click();
    cy.get(`@${OPERATOR.ASSIGNMENT}`).click();

    cy.get('#total').should('have.text', '1');
  });
});
