import {INPUT_OPERATION_WITHOUT_NUMBER_ERROR, MAX_LENGTH_NUMBERS_EXCEEDED_ERROR} from '../../src/js/constants/Messege.js'

describe('My Calculator Test', () => {
  beforeEach(()=>{
    cy.visit('/');
  })
  
  it('두 개의 숫자를 더한다', () => {
    const [testExpression, result] = ['61+35', 61+35];

    inputExpression(testExpression);

    cy.contains('=').click();

    sholudDisplay(result);

  })

  it('두 개의 숫자를 뺀다', () => {
    const [testExpression, result] = ['21-15', 21-15];

    inputExpression(testExpression);

    cy.contains('=').click();

    sholudDisplay(result);
  })

  it('두 개의 숫자를 곱한다', () => {
    const [testExpression, result] = ['16X31', 16*31];

    inputExpression(testExpression);

    cy.contains('=').click();

    sholudDisplay(result);
  })

  it('두 개의 숫자를 나눈다', () => {
    const [testExpression, result] = ['125/5', 125/5];

    inputExpression(testExpression);

    cy.contains('=').click();

    sholudDisplay(result);
  })

  it('AC버튼읗 누르면 디스플레이 값이 0으로 초기화 된다', () => {
    cy.get('.modifier').click();
    
    cy.contains('=').click();
    sholudDisplay(0);
  })

  it('숫자는 연속해서 최대 3자리 수까지만 입력가능하다 ', () => {
    const [testExpression, result] = ['1234', 123];
    inputExpression(testExpression);

    cy.on('window: alert', (txt) => {
      expect(txt).to.contains(MAX_LENGTH_NUMBERS_EXCEEDED_ERROR)
    })

    sholudDisplay(result);
  })

  it('계산 결과를 표현할 때 소수점이하는 버린다.', () => {

    const [testExpression, result] = ['123/10', Math.floor(123/10)];

    inputExpression(testExpression);

    cy.contains('=').click();

    sholudDisplay(result);
  })
})

function inputExpression(testExpression) {
  [...testExpression].forEach(char => clickChar(char));

}

function clickChar(char) {
  if (isNaN(char)) {
    const operator = char;
    cy.get('.operation').contains(operator).click();
    return;
  }
  const number = char;
  cy.get('.digit').contains(number).click();
  return;
}

function sholudDisplay(result) {
  cy.get('#total').should('have.text', result);
}
