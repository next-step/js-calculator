describe('2개의 숫자에 대해 덧셈이 가능하다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('9 + 5 = 14', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(4)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '14');
  });
  it('179 + 43 = 222', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(4)').click();
    cy.get('.digit:nth-child(6)').click();
    cy.get('.digit:nth-child(7)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '222');
  });
});

describe('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('9 - 5 = 4', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(3)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '4');
  });
  it('179 - 987 = -808', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(3)').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.digit:nth-child(2)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '-808');
  });
});

describe('2개의 숫자에 대해 곱셈이 가능하다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('9 X 5 = 45', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(2)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '45');
  });
  it('179 X 87 = 15573', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(2)').click();
    cy.get('.digit:nth-child(2)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '15573');
  });
});

describe('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('10 / 5 = 2', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.digit:nth-child(10)').click();
    cy.get('.operation:nth-child(1)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '2');
  });
  it('9 / 5 = 1', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(1)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '1');
  });
  it('987 / 34 = 29', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.digit:nth-child(2)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.operation:nth-child(1)').click();
    cy.get('.digit:nth-child(7)').click();
    cy.get('.digit:nth-child(6)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '29');
  });
});

describe('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('1을 누른 후 AC를 누르면 0이 된다.', () => {
    cy.get('.digit:nth-child(9)').click();
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });
  it('숫자와 연산을 누른 후 AC를 누르면 0이 된다.', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(1)').click();
    cy.get('.digit:nth-child(7)').click();
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });
  it('계산 중 AC로 초기화 한 이후에 이어서 9 X 5 = 45를 계산한다.', () => {
    cy.get('.digit:nth-child(1)').click();
    cy.get('.digit:nth-child(2)').click();
    cy.get('.digit:nth-child(3)').click();
    cy.get('.operation:nth-child(1)').click();
    cy.get('.digit:nth-child(7)').click();
    cy.get('.digit:nth-child(6)').click();
    cy.get('.modifier').click();
    cy.get('.digit:nth-child(1)').click();
    cy.get('.operation:nth-child(2)').click();
    cy.get('.digit:nth-child(5)').click();
    cy.get('.operation:last-child').click();
    cy.get('#total').should('have.text', '45');
  });
});
