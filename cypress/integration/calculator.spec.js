import {
  ADD_OPERATOR,
  CALCULATE_OPERATOR,
  DIVIDE_OPERATOR,
  POW_OPERATOR,
  SUBTRACT_OPERATOR,
} from '../../src/js/constants/operator.js';
import { INITIAL_DIGITS } from '../../src/js/constants/calculator.js';

const APP_URL = '../../index.html';
const TOTAL_ID = '#total';

function digitHandler(digit) {
  return cy.get('.digit').contains(digit).click();
}

function operatorHandler(operator) {
  return cy.get('.operation').contains(operator).click();
}

function calculateHandler() {
  return cy.get('.operation').contains(CALCULATE_OPERATOR).click();
}

function checkEqualTotal(value) {
  return cy.get(TOTAL_ID).should('have.text', value);
}

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit(APP_URL);
  });

  describe('화면 테스트', () => {
    it('Total에 나오는 최초 숫자는 0', () => {
      checkEqualTotal(INITIAL_DIGITS);
    });

    it('숫자 버튼 클릭시 현재 Total에 해당 숫자 추가', () => {
      digitHandler(1);
      checkEqualTotal(1);
    });

    it('연산자 버튼 클릭시 현재 Total에 연산자 추가', () => {
      operatorHandler(ADD_OPERATOR);
      checkEqualTotal(INITIAL_DIGITS + ADD_OPERATOR);
    });

    it('입력가능한 자리수는 3', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(3);
      digitHandler(4);
      checkEqualTotal(123);
    });

    it('연속적인 연산자 입력 불가', () => {
      operatorHandler(ADD_OPERATOR);
      operatorHandler(ADD_OPERATOR);
      checkEqualTotal(INITIAL_DIGITS + ADD_OPERATOR);
    });
  });

  describe('연산 테스트', () => {
    it('ADD', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(0);
      operatorHandler(ADD_OPERATOR);
      digitHandler(3);
      digitHandler(1);
      checkEqualTotal(`120${ADD_OPERATOR}31`);
      calculateHandler();
      checkEqualTotal(120 + 31);
    });

    it('SUBTRACT', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(0);
      operatorHandler(SUBTRACT_OPERATOR);
      digitHandler(3);
      digitHandler(1);
      checkEqualTotal(`120${SUBTRACT_OPERATOR}31`);
      calculateHandler();
      checkEqualTotal(120 - 31);
    });

    it('POW', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(0);
      operatorHandler(POW_OPERATOR);
      digitHandler(3);
      digitHandler(1);
      checkEqualTotal(`120${POW_OPERATOR}31`);
      calculateHandler();
      checkEqualTotal(120 * 31);
    });

    it('DIVIDE', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(0);
      operatorHandler(DIVIDE_OPERATOR);
      digitHandler(3);
      digitHandler(1);
      checkEqualTotal(`120${DIVIDE_OPERATOR}31`);
      calculateHandler();
      checkEqualTotal(Math.floor(120 / 31));
    });

    it('LAST ADD', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(3);
      operatorHandler(ADD_OPERATOR);
      calculateHandler();
      checkEqualTotal(123);
    });

    it('LAST SUBTRACT', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(3);
      operatorHandler(SUBTRACT_OPERATOR);
      calculateHandler();
      checkEqualTotal(123);
    });

    it('LAST POW', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(3);
      operatorHandler(POW_OPERATOR);
      calculateHandler();
      checkEqualTotal(123);
    });

    it('LAST DIVIDE', () => {
      digitHandler(1);
      digitHandler(2);
      digitHandler(3);
      operatorHandler(DIVIDE_OPERATOR);
      calculateHandler();
      checkEqualTotal(123);
    });
  });
});
