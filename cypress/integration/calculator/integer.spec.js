import { calculate } from '../../../src/js/utils/calculation';
import { getRandomIntInclusive, cipherNumber } from './util';

before(() => {
  cy.visit('index.html');
});

describe('계산 결과를 표현할 때 소수점 이하는 버림한다', () => {
  let n1, n2, n3, n4, n5, n6;
  const operator = '/';

  beforeEach(() => {
    cy.clickModifier();
    n1 = getRandomIntInclusive();
    n2 = getRandomIntInclusive();
    n3 = getRandomIntInclusive();
    n4 = getRandomIntInclusive();
    n5 = getRandomIntInclusive();
    n6 = getRandomIntInclusive();
  });

  it('1자리 / 1자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');

    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1), operator, cipherNumber(n4)))
    );
  });

  it('2자리 / 1자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(
        calculate(cipherNumber(n1, n2), operator, cipherNumber(n4))
      )
    );
  });

  it('3자리 / 1자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2, n3), operator, cipherNumber(n4)))
    );
  });

  it('1자리 / 2자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1), operator, cipherNumber(n4, n5)))
    );
  });

  it('2자리 / 2자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2), operator, cipherNumber(n4, n5)))
    );
  });

  it('3자리 / 2자리', () => {
    // 2자리 / 3자리
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2, n3), operator, cipherNumber(n4, n5)))
    );
  });

  it('1자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1), operator, cipherNumber(n4, n5, n6)))
    );
  });

  it('2자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2), operator, cipherNumber(n4, n5, n6)))
    );
  });

  it('3자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2, n3), operator, cipherNumber(n4, n5, n6)))
    );
  });

  it('예외상황 테스트', () => {
    cy.clickDigit(n1);
    cy.clickOperation('=');
    cy.clickDigit(n2);
    cy.clickOperation('=');
    cy.clickDigit(n3);
    cy.clickOperation('+');
    cy.clickOperation('/');
    cy.clickOperation('X');
    cy.clickOperation('=');
    cy.clickOperation(operator);
    cy.clickOperation('=');
    cy.clickOperation('=');
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      Number.parseInt(calculate(cipherNumber(n1, n2, n3), operator, cipherNumber(n4, n5, n6)))
    );
  });
});
