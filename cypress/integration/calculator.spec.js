import { MESSAGE, DOM, OPERATION, MODIFIER, INIT_STATE } from '../../src/js/constants.js';

const CLICK_DIGIT = digit => cy.get(`${DOM.digits} > ${DOM.digit}`).contains(digit).click();
const CLICK_OPERATOR = operator =>
  cy.get(`${DOM.operations} > ${DOM.operation}`).contains(operator).click();
const CLICK_MODIFIER = modifier =>
  cy.get(`${DOM.modifiers} > ${DOM.modifier}`).contains(modifier).click();
const CHECK_ALERT_MESSAGE = message =>
  cy.on('window:alert', text => {
    expect(text).to.contains(message);
  });
const THE_RESULT_SHOULD_BE = result => cy.get(DOM.total).should('have.text', result);

describe('js-calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    CLICK_DIGIT('1');
    CLICK_OPERATOR(OPERATION.plus);
    CLICK_DIGIT('2');
    CLICK_OPERATOR(OPERATION.equal);
    THE_RESULT_SHOULD_BE('3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    CLICK_DIGIT('3');
    CLICK_OPERATOR(OPERATION.minus);
    CLICK_DIGIT('2');
    CLICK_OPERATOR(OPERATION.equal);
    THE_RESULT_SHOULD_BE('1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    CLICK_DIGIT('3');
    CLICK_OPERATOR(OPERATION.multiple);
    CLICK_DIGIT('2');
    CLICK_OPERATOR(OPERATION.equal);
    THE_RESULT_SHOULD_BE('6');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    CLICK_DIGIT('6');
    CLICK_OPERATOR(OPERATION.division);
    CLICK_DIGIT('2');
    CLICK_OPERATOR(OPERATION.equal);
    THE_RESULT_SHOULD_BE('3');
  });

  it(`AC(All Clear)버튼을 누르면 ${INIT_STATE.currentTotal}으로 초기화 한다.`, () => {
    CLICK_DIGIT('6');
    CLICK_DIGIT('2');
    CLICK_MODIFIER(MODIFIER.allClear);
    THE_RESULT_SHOULD_BE(INIT_STATE.currentTotal);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    CLICK_DIGIT('6');
    CLICK_DIGIT('2');
    CLICK_DIGIT('2');
    CLICK_DIGIT('2');
    CHECK_ALERT_MESSAGE(MESSAGE.numberCanBeEnteredUpToThreeDigitsAtOnce);
    THE_RESULT_SHOULD_BE('622');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    CLICK_DIGIT('1');
    CLICK_DIGIT('2');
    CLICK_OPERATOR(OPERATION.division);
    CLICK_DIGIT('5');
    CLICK_OPERATOR(OPERATION.equal);
    THE_RESULT_SHOULD_BE('2');
  });
});
