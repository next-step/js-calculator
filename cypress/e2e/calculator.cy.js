import { checkResultAfterClickTwoNumberAndOperator } from '../support/calculator';

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
});
