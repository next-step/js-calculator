import { errorMessages } from '../../src/js/calculator';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickNumber('1');
    cy.clickNumber('2');
    cy.clickNumber('3');
    cy.clickOperator('+');
    cy.clickNumber('4');
    cy.clickNumber('5');
    cy.clickNumber('6');
    cy.findByRole('heading').should('have.text', '123+456');

    cy.calculate();
    cy.findByRole('heading').should('have.text', 123 + 456);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickNumber('4');
    cy.clickNumber('5');
    cy.clickNumber('6');
    cy.clickOperator('-');
    cy.clickNumber('1');
    cy.clickNumber('2');
    cy.clickNumber('3');
    cy.findByRole('heading').should('have.text', '456-123');

    cy.calculate();
    cy.findByRole('heading').should('have.text', 456 - 123);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clickNumber('1');
    cy.clickNumber('2');
    cy.clickOperator('X');
    cy.clickNumber('3');
    cy.clickNumber('4');
    cy.findByRole('heading').should('have.text', '12X34');

    cy.calculate();
    cy.findByRole('heading').should('have.text', 12 * 34);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickNumber('1');
    cy.clickNumber('2');
    cy.clickOperator('/');
    cy.clickNumber('3');
    cy.findByRole('heading').should('have.text', '12/3');

    cy.calculate();
    cy.findByRole('heading').should('have.text', 12 / 3);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.clickNumber('1');
    cy.clickNumber('5');
    cy.clearAll();
    cy.findByRole('heading').should('have.text', 0);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clickNumber('1');
    cy.clickNumber('5');
    cy.clickOperator('/');
    cy.clickNumber('4');
    cy.findByRole('heading').should('have.text', '15/4');

    cy.calculate();
    cy.findByRole('heading').should('have.text', parseInt(15 / 4, 10));
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const inputs = '1234';

    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessages.MAX_LENGTH_ERROR);
    });

    inputs.split('').forEach((number) => {
      cy.clickNumber(number);
    });
    cy.findByRole('heading').should('have.text', inputs.substring(0, 3));
  });
});
