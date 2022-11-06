import { checkResultAfterClickTwoNumberAndOperator, clickElementNTimes } from '../support/calculator';

describe('calculator test', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('add two number', () => {
    checkResultAfterClickTwoNumberAndOperator('1', '2', '+', '3');
  });

  it('subtract two number', () => {
    checkResultAfterClickTwoNumberAndOperator('3', '2', '-', '1');
  });

  it('multiply two number', () => {
    checkResultAfterClickTwoNumberAndOperator('3', '2', 'X', '6');
  });

  it('divide two number', () => {
    checkResultAfterClickTwoNumberAndOperator('9', '5', '/', '1');
  });

  it('initialize 0 after click All Clear button', () => {
    clickElementNTimes('1', 1);
    clickElementNTimes('AC', 1);
    cy.getByDataset('total').should('have.text', '0');

    checkResultAfterClickTwoNumberAndOperator('6', '4', '+', '10');
    clickElementNTimes('AC', 1);
    cy.getByDataset('total').should('have.text', '0');
  });
});
