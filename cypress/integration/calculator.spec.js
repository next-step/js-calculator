import { MESSAGE, OPERATION, MODIFIER, INIT_STATE } from '../../src/js/constants.js';

describe('js-calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.clickDigit('1');
    cy.clickOperation(OPERATION.plus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.minus);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clickDigit('3');
    cy.clickOperation(OPERATION.multiple);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('6');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clickDigit('6');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('3');
  });

  it(`AC(All Clear)버튼을 누르면 ${INIT_STATE.currentTotal}으로 초기화 한다.`, () => {
    cy.clickDigit('6');
    cy.clickDigit('2');
    cy.clickModifier(MODIFIER.allClear);
    cy.totalShouldBe(INIT_STATE.currentTotal);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.clickDigit('6');
    cy.clickDigit('2');
    cy.clickDigit('2');
    cy.clickDigit('2');
    cy.checkAlertMessage(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
    cy.totalShouldBe('622');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clickDigit('1');
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.division);
    cy.clickDigit('5');
    cy.clickOperation(OPERATION.equal);
    cy.totalShouldBe('2');
  });

  it('연산자 앞에는 숫자가 있어야 한다.', () => {
    cy.clickOperation(OPERATION.plus);
    cy.checkAlertMessage(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
    cy.totalShouldBe(INIT_STATE.currentTotal);
  });

  it('"=" 클릭 시 맨 마지막 클릭한 버튼은 숫자여야 한다.', () => {
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickOperation(OPERATION.equal);
    cy.checkAlertMessage(MESSAGE.lastCharacterMustBeNumber);
    cy.totalShouldBe(`2${OPERATION.plus}`);
  });

  it('연산자를 연속으로 누를 수 없다.', () => {
    cy.clickDigit('2');
    cy.clickOperation(OPERATION.plus);
    cy.clickOperation(OPERATION.plus);
    cy.checkAlertMessage(MESSAGE.operationCannotBeEnteredConsecutively);
    cy.totalShouldBe(`2${OPERATION.plus}`);
  });
});
