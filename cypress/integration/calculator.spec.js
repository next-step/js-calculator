describe('ui-calculator', () => {
  beforeEach(() => {
    // run live server
    cy.visit('http://localhost:5500/');
    cy.get('button').contains(`AC`).click();
  });

  afterEach(() => {
    cy.get('button').contains(`AC`).click();
  })

  const runOperation = (op1, operator, op2) => {
    op1.forEach((num) => {
      cy.get('button').contains(`${num}`).click();
    });

    cy.get('.operations').contains(operator).click();

    op2.forEach((num) => {
      cy.get('button').contains(`${num}`).click();
    });
    
    cy.get('.operations').contains('=').click();
  }
  
  const getResult = (op1, operator, op2) => {
    let res;

    switch(operator) {
      case '+': res = op1 + op2; break;
      case '-': res = op1 - op2; break;
      case 'X': res = op1 * op2; break;
      case '/': res = Math.floor(op1 / op2); break;
    }

    return res;
  }

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    const op1 = ['4', '3', '2'];
    const op2 = ['5', '6', '1'];
    const operator = '+';

    runOperation(op1, operator, op2);
    const res = getResult(Number(op1.join('')), operator, Number(op2.join('')));

    cy.get('#total').should('have.text', res);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    const op1 = ['4', '3', '2'];
    const op2 = ['5', '6', '1'];
    const operator = 'X';

    runOperation(op1, operator, op2);
    const res = getResult(Number(op1.join('')), operator, Number(op2.join('')));

    cy.get('#total').should('have.text', res);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const op1 = ['4', '3', '2'];
    const op2 = ['5'];
    const operator = '/';

    runOperation(op1, operator, op2);
    const res = getResult(Number(op1.join('')), operator, Number(op2.join('')));

    cy.get('#total').should('have.text', res);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    const op1 = ['4', '3', '2'];
    const op2 = ['1', '5', '4'];
    const operator = '-';

    runOperation(op1, operator, op2);
    const res = getResult(Number(op1.join('')), operator, Number(op2.join('')));

    cy.get('#total').should('have.text', res);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const op1 = ['4', '3', '2'];
    const op2 = ['1', '5', '4'];
    const operator = '+';

    runOperation(op1, operator, op2);
    cy.get('button').contains(`AC`).click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const errorMsg = '숫자는 세 자리까지 입력 가능합니다!';

    cy.get('button').contains(`1`).click();
    cy.get('button').contains(`1`).click();
    cy.get('button').contains(`1`).click();

    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('button').contains('1').click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(errorMsg);
        });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const op1 = ['4', '3', '1'];
    const op2 = ['3'];
    const operator = '/';

    runOperation(op1, operator, op2);
    let res = getResult(Number(op1.join('')), operator, Number(op2.join('')));

    cy.get('#total').should('have.text', res);
  });
});