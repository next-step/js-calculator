describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  function clickDigit(digit) {
    cy.get('.digit').contains(digit).click();
  }
  function clickOperation(operation) {
    cy.get('.operation').contains(operation).click();
  }
  function clickAllClear() {
    cy.get('.modifier').contains('AC').click();
  }
  function getTotal(total) {
    cy.get('#total').should('have.text', total);
  }

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    clickDigit('1');
    clickOperation('+');
    clickDigit('2');
    clickOperation('=');
    getTotal('3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    clickDigit('5');
    clickOperation('-');
    clickDigit('4');
    clickOperation('=');
    getTotal('1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    clickDigit('5');
    clickOperation('X');
    clickDigit('4');
    clickOperation('=');
    getTotal('20');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    clickDigit('5');
    clickOperation('/');
    clickDigit('1');
    clickOperation('=');
    getTotal('5');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    clickDigit('2');
    clickAllClear();
    getTotal('0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    clickDigit('1');
    clickDigit('2');
    clickDigit('3');
    clickDigit('4');
    getTotal('123');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickDigit('6');
    clickOperation('/');
    clickDigit('5');
    clickOperation('=');
    getTotal('1');
  });
});
