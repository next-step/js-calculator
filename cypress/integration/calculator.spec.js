describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const PLUS = '+';
  const MINUS = '-';
  const MULTIPLICATION = '*';
  const DIVISION = '/';

  const inputNinetyNine = () => {
    //
  };

  const calculation = ({ num1 = 999, num2 = 999, op = '' }) => {
    if (!op) {
      throw Error('계산을 하기 위해 연산자를 인자로 넘겨야 합니다. ');
    }

    const operators = {
      '+': () => num1 + num2,
      '-': () => num1 - num2,
      '*': () => num1 * num2,
      '/': () => Math.round(num1 / num2),
    };

    return operators[op]?.();
  };

  it('2개의 숫자에 대해 덧셈이 가능해야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('+').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ op: PLUS }));
  });

  it('2개의 숫자에 대해 뺄셈이 가능해야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('-').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ op: MINUS }));
  });

  it('2개의 숫자에 대해 곱셈이 가능해야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('*').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ op: MULTIPLICATION }));
  });

  it('2개의 숫자에 대해 나눗셈이 가능해야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('/').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ op: DIVISION }));
  });

  it('나눗셈을 할 때 소수점 이하는 버려야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('/').click();
    cy.contains('8').click();
    cy.contains('=').click();

    cy.get('#total').should('have.text', Math.round(999 / 8));
  });

  it('숫자는 3자리까지만 입력이 가능해야 한다.', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));

    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();

    cy.get('@windowAlert').should(
      'be.calledWith',
      '숫자는 최대 3자리 수까지만 입력 가능합니다.',
    );
  });

  it('"AC" 버튼을 클릭했을 때 결과화면이 0으로 초기화 되어야 한다.', () => {
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('9').click();
    cy.contains('AC').click();

    cy.get('#total').should('have.text', '0');
  });
});
