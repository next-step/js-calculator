import { calculatorInitValue } from '../../src/js/constants';

describe('계산기 테스트', () => {
  let digitElement;
  let operationElement;
  let totalElement;
  let allClearElement;

  beforeEach(() => {
    cy.visit('../../index.html');
    digitElement = cy.get('.digit');
    operationElement = cy.get('.operation');
    totalElement = cy.get('#total');
    allClearElement = cy.get('.modifier').contains('AC');
  });

  it('2개 숫자에 대해 덧셈이 가능하다.', () => {
    digitElement.contains('1').click();
    operationElement.contains('+').click();
    digitElement.contains('9').click();
    operationElement.contains('=').click();
    totalElement.should('have.text', '10');
  });

  it('2개 숫자에 대해 뺏셈이 가능하다.', () => {
    digitElement.contains('9').click();
    operationElement.contains('-').click();
    digitElement.contains('1').click();
    operationElement.contains('=').click();
    totalElement.should('have.text', '8');
  });

  it('2개 숫자에 대해 곱셈이 가능하다.', () => {
    digitElement.contains('3').click();
    operationElement.contains('X').click();
    digitElement.contains('2').click();
    operationElement.contains('=').click();
    totalElement.should('have.text', '6');
  });

  it('2개 숫자에 대해 나눗셈이 가능하다.', () => {
    digitElement.contains('4').click();
    operationElement.contains('/').click();
    digitElement.contains('2').click();
    operationElement.contains('=').click();
    totalElement.should('have.text', '2');
  });

  it('2개 숫자에 대해 나눗셈이 가능하다.', () => {
    digitElement.contains('4').click();
    operationElement.contains('/').click();
    digitElement.contains('2').click();
    operationElement.contains('=').click();
    totalElement.should('have.text', '2');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 된다.', () => {
    digitElement.contains('3').click();
    operationElement.contains('+').click();
    digitElement.contains('3').click();
    allClearElement.click();
    totalElement.should('have.text', calculatorInitValue);
  });

  it('숫자는 한번에 3자리 수 까지 입력 가능하다.', () => {
    digitElement.contains('1').click();
    digitElement.contains('2').click();
    digitElement.contains('3').click();
    digitElement.contains('4').click();
    allClearElement.click();
    totalElement.should('have.text', '123');
  });

  it('계산 결과를 표현할 떄는 소수점 이하는 버린다.', () => {
    digitElement.contains('7').click();
    operationElement.contains('/').click();
    digitElement.contains('2').click();
    allClearElement.click();
    totalElement.should('have.text', '3');
  });
});
