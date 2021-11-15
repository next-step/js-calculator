import { calculate } from '../../../src/js/utils/calculation';
import { getRandomIntInclusive, cipherNumber } from './util';

before(() => {
  cy.visit('index.html');
});

describe('AC(All Clear) 버튼을 누르면 0으로 초기화 한다', () => {
  let n1, n2, n3, n4, n5, n6;
  const operators = ['+', '-', 'X', '/'];

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
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('2자리 / 1자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('3자리 / 1자리', () => {
    // 3자리 / 1자리
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('1자리 / 2자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('2자리 / 2자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('2자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('1자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('2자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('3자리 / 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });

  it('예외상황 테스트', () => {
    cy.clickDigit(n1);
    cy.clickModifier();
    cy.clickDigit(n2);
    cy.clickModifier();
    cy.clickDigit(n3);
    cy.clickOperation('+');
    cy.clickOperation('/');
    cy.clickOperation('X');
    cy.clickModifier();
    cy.clickOperation(operators[getRandomIntInclusive(0, 3)]);
    cy.clickModifier();
    cy.clickModifier();
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickModifier();
    cy.get('#total').should('have.text', 0);
  });
});
