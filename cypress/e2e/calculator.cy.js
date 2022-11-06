import { ERROR_MESSAGES } from '../../src/js/constants';
import {
  checkResultAfterClickTwoNumberAndOperator,
  clickElementNTimes,
  checkAlertMessage,
} from '../support/calculator';

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

  it('can enter 3 number digits at once', () => {
    clickElementNTimes('1', 4);
    checkAlertMessage(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    cy.getByDataset('total').should('have.text', '111');

    clickElementNTimes('1', 1);
    cy.getByDataset('+').click();
    clickElementNTimes('1', 4);
    checkAlertMessage(ERROR_MESSAGES.MAX_DIGIT_NUMBER);

    cy.getByDataset('total').should('have.text', '111+111');
  });

  it('discarded decimal point when calculate result', () => {
    checkResultAfterClickTwoNumberAndOperator('9', '2', '/', '4');
  });
});
