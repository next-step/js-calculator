before(() => {
  cy.visit('index.html')
})
describe('js-calculator Test', () => {
  beforeEach(() => {
    cy.clickAC();
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    //given
    const number9 = 9;
    const number1 = 1
    const operationPlus = '+';
    const operationEq = '=';
    const sum = 10;

    //when
    cy.clickNumber(number9);
    cy.clickOperation(operationPlus);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${sum}`)
  })

  it('3개의 숫자에 대해 덧셈이 가능하다.', () => {
    //given
    const number7 = 7;
    const number9 = 9;
    const number1 = 1
    const operationPlus = '+';
    const operationEq = '=';
    const sum = 17;

    //when
    cy.clickNumber(number7);
    cy.clickOperation(operationPlus);
    cy.clickNumber(number9);
    cy.clickOperation(operationPlus);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${sum}`)
  })

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    //given

    //when

    //then
  })
  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    //given

    //when

    //then
  })
  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    //given

    //when

    //then
  })
  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    //given

    //when
    cy.clickAC();

    //then
    cy.get('#total').should('have.text', '0');
  })
  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    //given

    //when

    //then
  })
  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    //given

    //when

    //then
  })
})
