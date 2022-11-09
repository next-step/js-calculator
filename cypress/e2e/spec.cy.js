import { Calculator } from '/src/js/calculator';

describe('계산기 테스트', () => {
  before('기능', () => {
    cy.visit('/');
  })

  it('더하기', () => {
    clickDigit('2');
    clickOperator('+');
    clickDigit('5');
    clickOperator('=');
    cy.get('#total').invoke('text').should('eq', String('7'));
    clickReset();
  });

  it('초기화', () => {
    clickReset();
    cy.get('#total').invoke('text').should('eq', String('0'));
  })

  it('빼기', () => {
    clickDigit('2');
    clickOperator('-');
    clickDigit('3');
    clickOperator('=');
    cy.get('#total').invoke('text').should('eq', String('-1'));
    clickReset();
  })

  it('곱하기', () => {
    clickDigit('6');
    clickOperator('X');
    clickDigit('3');
    clickOperator('=');
    cy.get('#total').invoke('text').should('eq', String('18'));
    clickReset();
  })

  it('나누기', () => {
    clickDigit('1');
    clickDigit('0');
    clickOperator('/');
    clickDigit('5');
    clickOperator('=');
    cy.get('#total').invoke('text').should('eq', String('2'));
    clickReset();
  })

  it('나누기 :: 소수점 이하 버림', () => {
    clickDigit('9');
    clickOperator('/');
    clickDigit('6');
    clickOperator('=');
    cy.get('#total').invoke('text').should('eq', String('1'));
    clickReset();
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능', () => {
    clickDigit('9');
    clickDigit('6');
    clickDigit('5');
    checkAlert(clickDigit('1'), '숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.');
    clickReset();
  })

  it('연산을 입력하지 않고 결과를 누르면 연산 불가능', () => {
    clickDigit('8');
    clickDigit('7');
    checkAlert(clickOperator('='), '연산을 입력해주세요.');
    clickReset();
  })
})

function clickDigit(digit) {
  return cy.get('.digit').contains(digit).click();
}

function clickOperator(operator) {
  return cy.get('.operation').contains(operator).click();
}

function clickReset() {
  return cy.get('.modifier').click();
}

function checkAlert(scenario, message) {
  const stub = cy.stub();
  cy.on('window:alert', stub);
  scenario.then(() => expect(stub.getCall(0).lastArg).to.equals(message));
}