import { calculate } from '../../../src/js/utils/calculation';
import { getRandomIntInclusive, cipherNumber } from './util';

before(() => {
  cy.visit('index.html');
});

describe('숫자는 한번에 최대 3자리 수까지 입력 가능하다', () => {
  let n1, n2, n3, n4, n5, n6;

  beforeEach(() => {
    cy.clickModifier();
    n1 = getRandomIntInclusive();
    n2 = getRandomIntInclusive();
    n3 = getRandomIntInclusive();
    n4 = getRandomIntInclusive();
    n5 = getRandomIntInclusive();
    n6 = getRandomIntInclusive();
  });

  it('1자리 입력', () => {
    cy.clickDigit(n1);
    cy.get('#total').should('have.text', cipherNumber(n1));
  });

  it('2자리 입력', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.get('#total').should('have.text', cipherNumber(n1, n2));
  });

  it('3자리 입력', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.get('#total').should('have.text', cipherNumber(n1, n2, n3));
  });

  it('4자리 입력', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickDigit(n4);
    cy.get('#total').should('have.text', cipherNumber(n1, n2, n3));
  });

  it('5자리 입력', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.get('#total').should('have.text', cipherNumber(n1, n2, n3));
  });

  it('6자리 입력', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.get('#total').should('have.text', cipherNumber(n1, n2, n3));
  });
});
