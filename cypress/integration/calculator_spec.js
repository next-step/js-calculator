/// <reference types="Cypress" />

describe('계산기 테스트', () => {
  const clickNumberButton = (number) =>
    cy.get(`button[data-number='${number}']`).click();
  const clickOperatorButton = (operator) =>
    cy.get(`button[data-operator='${operator}']`).click();
  const resultShouldBeExpected = (expected) =>
    cy.get('#total').should('have.text', expected);
  const clickAllClearButton = () => cy.get(`button[data-ac=ac]`).click();

  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    clickAllClearButton();
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    clickNumberButton(1);
    clickOperatorButton('+');
    clickNumberButton(2);
    clickOperatorButton('=');
    resultShouldBeExpected(3);
  });
});
