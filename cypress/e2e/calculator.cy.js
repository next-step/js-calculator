const handleClick = {
  number: (num) => cy.get('.digit').contains(num).click(),
  operator: (op) => cy.get('.operation').contains(op).click(),
  clear: () => cy.get('.modifier').contains('AC').click(),
};
const assertTotalValue = (text) => cy.get('#total').should('have.text', text);

beforeEach(() => {
  cy.visit('/');
});

describe('계산기 테스트', () => {
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('+');
    handleClick.number('2');
    handleClick.operator('=');
    assertTotalValue('5');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('-');
    handleClick.number('2');
    handleClick.operator('=');
    assertTotalValue('1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    handleClick.number('3');
    handleClick.operator('X');
    handleClick.number('2');
    handleClick.operator('=');
    assertTotalValue('6');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    handleClick.number('6');
    handleClick.operator('/');
    handleClick.number('2');
    handleClick.operator('=');
    assertTotalValue('3');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    handleClick.number('3');
    handleClick.operator('X');
    handleClick.number('2');
    handleClick.clear();
    assertTotalValue('0');
  });

  it('첫번째 숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    handleClick.number('1');
    handleClick.number('2');
    handleClick.number('3');
    handleClick.number('4');
    assertTotalValue('123');
  });

  it('두번째 숫자도 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    handleClick.number('1');
    handleClick.number('2');
    handleClick.operator('+');
    handleClick.number('1');
    handleClick.number('2');
    handleClick.number('3');
    handleClick.number('4');
    assertTotalValue('12+123');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    handleClick.number('3');
    handleClick.operator('/');
    handleClick.number('2');
    handleClick.operator('=');
    assertTotalValue('1');
  });

  it('계산을 담당하는 연산자는 연속해서 입력할 수 없다.', () => {
    handleClick.number('3');
    handleClick.operator('+');
    handleClick.operator('+');
    assertTotalValue('3+');
  });

  it('어떠한 숫자를 0으로 나누면 alert메세지를 띄우고 0으로 초기화 한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    handleClick.number('6');
    handleClick.operator('/');
    handleClick.number('0');
    handleClick.operator('=').then(() => {
      const actualMessage = alertStub.getCall(0).lastArg;
      expect(actualMessage).to.equal('0으로 나눌 수 없습니다!');
    });
    assertTotalValue('0');
  });
});
