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
    const number9 = 9;
    const number1 = 1
    const operationSub = '-';
    const operationEq = '=';
    const total = 8;

    //when
    cy.clickNumber(number9);
    cy.clickOperation(operationSub);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('3개의 숫자에 대해 뺄셈이 가능하다.', () => {
    //given
    const number7 = 7;
    const number9 = 9;
    const number1 = 1
    const operationSub = '-';
    const operationEq = '=';
    const total = -3;

    //when
    cy.clickNumber(number7);
    cy.clickOperation(operationSub);
    cy.clickNumber(number9);
    cy.clickOperation(operationSub);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    const number9 = 9;
    const number1 = 1
    const operationMul = 'X';
    const operationEq = '=';
    const total = 9;

    //when
    cy.clickNumber(number9);
    cy.clickOperation(operationMul);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('3개의 숫자에 대해 곱셈이 가능하다.', () => {
    //given
    const number7 = 7;
    const number9 = 9;
    const number0 = 0;
    const operationMul = 'X';
    const operationEq = '=';
    const total = 0;

    //when
    cy.clickNumber(number7);
    cy.clickOperation(operationMul);
    cy.clickNumber(number9);
    cy.clickOperation(operationMul);
    cy.clickNumber(number0);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const number9 = 9;
    const number1 = 3;
    const operationDiv = '/';
    const operationEq = '=';
    const total = 3;

    //when
    cy.clickNumber(number9);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number1);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('3개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const number8 = 8;
    const number4 = 4;
    const number2 = 2;
    const operationDiv = '/';
    const operationEq = '=';
    const total = 1;

    //when
    cy.clickNumber(number8);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number4);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number2);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
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
    const number7 = 7;
    const number9 = 9;
    const number1 = 1;
    const number5 = 5;
    const total = 791

    //when
    cy.clickNumber(number7);
    cy.clickNumber(number9);
    cy.clickNumber(number1);
    cy.clickNumber(number5);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })
  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const number8 = 8;
    const number4 = 4;
    const number2 = 2;
    const number3 = 3;
    const number7 = 7;
    const operationPlus = '+';
    const operationSub = '-';
    const operationMul = 'X';
    const operationDiv = '/';
    const operationEq = '=';
    const total = 2;

    //when
    cy.clickNumber(number8);
    cy.clickOperation(operationMul);
    cy.clickNumber(number4);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number2);
    cy.clickOperation(operationPlus);
    cy.clickNumber(number3);
    cy.clickOperation(operationSub);
    cy.clickNumber(number3);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number7);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })

  it('연산자를 여러번 입력시 가장 마지막에 입력한 연산자로 적용되 계산한다', () => {
    const number8 = 8;
    const number4 = 4;
    const operationPlus = '+';
    const operationSub = '-';
    const operationMul = 'X';
    const operationDiv = '/';
    const operationEq = '=';
    const total = 2;

    //when
    cy.clickNumber(number8);
    cy.clickOperation(operationMul);
    cy.clickOperation(operationDiv);
    cy.clickOperation(operationPlus);
    cy.clickOperation(operationSub);
    cy.clickOperation(operationDiv);
    cy.clickNumber(number4);
    cy.clickOperation(operationEq);

    //then
    cy.get('#total').should('have.text', `${total}`)
  })
})
