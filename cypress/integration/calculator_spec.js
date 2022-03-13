/// <reference types="Cypress" />

describe('계산기 테스트', () => {
  const clickNumberButton = (number) =>
    cy.get(`button[data-number='${number}']`).click();
  const clickNumberButtons = (...numbers) => {
    numbers.forEach((number) => clickNumberButton(number));
  };
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
  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    clickNumberButton(1);
    clickOperatorButton('-');
    clickNumberButton(2);
    clickOperatorButton('=');
    resultShouldBeExpected(-1);
  });
  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    clickNumberButton(1);
    clickOperatorButton('*');
    clickNumberButton(2);
    clickOperatorButton('=');
    resultShouldBeExpected(2);
  });
  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    clickNumberButton(4);
    clickOperatorButton('/');
    clickNumberButton(2);
    clickOperatorButton('=');
    resultShouldBeExpected(2);
  });
  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickNumberButton(4);
    clickOperatorButton('/');
    clickNumberButton(2);
    clickOperatorButton('=');
    clickAllClearButton();
    resultShouldBeExpected(0);
  });
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다. 3자리 넘게 입력하면 alert이 호출된다.', () => {
    cy.on('window:alert', (text) => {
      expect(text).to.contains('숫자는 세 자리까지만 입력 가능합니다!');
    });

    clickNumberButtons(4, 4, 4, 4);
    resultShouldBeExpected(444);
  });
  it('계산 결과를 표현할 때 소수점 이하는 버림한다. (결과가 양수인 경우)', () => {
    clickNumberButton(4);
    clickOperatorButton('/');
    clickNumberButton(3);
    clickOperatorButton('=');
    resultShouldBeExpected(1);
  });
  it('계산 결과를 표현할 때 소수점 이하는 버림한다. (결과가 음수인 경우)', () => {
    clickNumberButton(3);
    clickOperatorButton('-');
    clickNumberButton(6);
    clickOperatorButton('=');
    clickOperatorButton('/');
    clickNumberButton(2);
    clickOperatorButton('=');
    resultShouldBeExpected(-1);
  });
});
