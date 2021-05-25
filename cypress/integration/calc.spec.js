describe("renders calculator", () => {
  beforeEach(() => {
    cy.visit('/')
  });

  const calculator = (operator) => {
    const leftNumber = '123';
    const rightNumber = '3';
    const equal = '=';

    leftNumber.split('').map(number => cy.get('.digits').contains(number).click());
    cy.contains(operator).click();
    rightNumber.split('').map(number => cy.get('.digits').contains(number).click());
    cy.contains(equal).click();
  }

  it ('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    calculator('+');
    cy.get('#total').should('have.text', Math.floor(123 + 3));
  });

  it ('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    calculator('-');
    cy.get('#total').should('have.text', Math.floor(123 - 3));
  });

  it ('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    calculator('X');
    cy.get('#total').should('have.text', Math.floor(123 * 3));
  });

  it ('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    calculator('/');
    cy.get('#total').should('have.text', Math.floor(123 / 3));
  });

  it ('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', 0);
  });

  it ('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    calculator('/');
    cy.get('#total').should('have.text', Math.floor(123 / 3));
  });

  it ('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    let numbers = '1234';
    let count = 0;

    numbers.split('').forEach(number => {
      cy.contains(number).click();
      count++;

      if (count === 3) alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다!');
    });

    cy.get('#total').should('have.text', numbers.slice(0, numbers.length - 1));
  });
});
