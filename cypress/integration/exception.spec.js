import { MESSAGE, OPERATION, INIT_STATE } from '../../src/js/constants.js';

describe('예외 처리하기', () => {
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.clickDigit('6');
    cy.clickDigit('2');
    cy.clickDigit('2');
    cy.clickDigit('2');
    cy.checkAlertMessage(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
    cy.totalShouldBe('622');
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
