describe('calculator test! hahaha', () => {
  const REPEAT = Cypress.env('REPEAT');
  beforeEach(() => {
    cy.visit('/');
  });

  it('ac버튼을 누르면 0 으로 초기화 된다.', () => {
    cy.allClearTest(REPEAT);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    for (let i = 0; i < REPEAT; i++) {
      const stub = cy.stub();
      const msg = Cypress.env('ALERT')['OVER'];
      cy.on('window:alert', stub);
      cy.clickDigits(100);
      cy.get(`[data-cy=1]`)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(msg);
        });
    }
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    for (let i = 0; i < REPEAT; i++) {
      cy.clickDigits(1);
      cy.clickOp('/');
      cy.clickDigits(6);
      cy.run();
      cy.get('#total').should('have.text', 0);
    }
  });

  it('연속해서 연산자를 클릭하지 못한다.', () => {
    for (let i = 0; i < REPEAT; i++) {
      cy.clear();
      const msg = Cypress.env('ALERT')['DIGIT_FIRST'];
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.clickOp();
      cy.clickOp().then(() => {
        expect(stub.getCall(0)).to.be.calledWith(msg);
      });
    }
  });
});
