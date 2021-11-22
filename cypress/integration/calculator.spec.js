
import { ZERO, RES, ERROR} from "../../src/js/constants";

const BASE_URL = 'http://127.0.0.1:49714/';
const totalIsResult = (result) => cy.get('#total').should('have.text', result)
const clickButtonsTest = (test) => {
   [...test].forEach((str) => cy.contains("button", str).click())
};

describe('cc-1-js-calculator', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    clickButtonsTest('30+20=');
    totalIsResult(RES + (30 + 20));
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    clickButtonsTest('30-20=');
    totalIsResult(RES + (30 - 20));
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.\n", () => {
    clickButtonsTest('30X20=');
    totalIsResult(RES + (30 * 20));
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.\n", () => {
    clickButtonsTest('300/20=');
    totalIsResult(RES + (300 / 20));
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    clickButtonsTest(['1', '2', '+', 'AC']);
    totalIsResult(Number(ZERO));
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다. (+alert로 알려준다.)', () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);
    clickButtonsTest('345');
    cy.contains("button", "6")
    .click()
    .then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ERROR.MAX_NUMBER);
    });
  });

  it('연산자 버튼을 여러 번 누르면 마지막에 누른 연산자로 갱신된다.', () => {
    clickButtonsTest('12+-');
    totalIsResult('12-');
  });

  it('연산자를 이미 입력하고 두번째 수를 입력했을 때 -> = 외 다른 연산자를 누르면 무시한다.', () => {
    clickButtonsTest('1+2+-/X');
    totalIsResult('1+2');
  });

  it('첫번째 수가 입력되고, 두번째 수가 입력되지 않은 상태에서 = 를 누르면 무시한다..', () => {
    clickButtonsTest('123==');
    totalIsResult(123);
  });

  it('계산이 완료되고, 다른 연산자를 누를 경우 무시한다.', () => {
    clickButtonsTest('123+1=+-X');
    totalIsResult(RES + (123+1));
  });

  it('계산이 완료되고, 숫자 버튼을 누르면 다시 새로운 계산 하기.', () => {
    const test = '12+1=1'
    const result = 1
    clickButtonsTest(test);
    totalIsResult(result);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickButtonsTest('5/2=');
    totalIsResult(RES + 2);
  });

  it('숫자를 입력하지 않고, 연산자를 입력하면 무시한다.', () => {
    clickButtonsTest('+-/X');
    totalIsResult(0);
  });
});
