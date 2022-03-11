import { range } from '../../src/js/utils/common.js';

const BASE_URL = cy.config('baseUrl');
before(() => cy.visit(BASE_URL));

describe('계산기 어플리케이션 테스트', () => {
  beforeEach(cy.resetAll);

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.executeOperation(2, '+', 5);
    cy.resetAll();
    cy.getTotalValue().should('eq', '0');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.executeOperation(2, '+', 5);
    cy.getTotalValue().should('eq', `${2 + 5}`);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.executeOperation(2, '-', 5);
    cy.getTotalValue().should('eq', `${2 - 5}`);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.executeOperation(2, 'X', 5);
    cy.getTotalValue().should('eq', `${2 * 5}`);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.executeOperation(2, '/', 5);
    cy.getTotalValue().should('eq', `${Math.floor(2 / 5)}`);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    range(4).forEach((_) => cy.clickElement('button.digit[data-value="2"]'));
    cy.getTotalValue().should('eq', '222');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.executeOperation(2, '/', 5);
    cy.getTotalValue().should('eq', `${Math.floor(2 / 5)}`);
  });
});
