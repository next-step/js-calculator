import { calculation } from '../../src/js/utils/calculation.js';
import { PLUS, MINUS, MULTIPLICATION, DIVISION, MESSAGE, INITIAL_VALUE } from '../../src/js/utils/constant.js';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:63342/js-calculator/index.html?_ijt=c12dffg2pbnk564pdcmh4l7qa5');
  });

  const clickNumber = (number = 999) => {
    String(number)
      .split('')
      .map((num) => cy.get('.digits').contains(num).click());
  };

  it('2개의 숫자에 대해 덧셈이 가능해야 한다.', () => {
    clickNumber(999);
    cy.contains(PLUS).click();
    clickNumber(999);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: PLUS }));
  });

  it('2개의 숫자에 대해 뺄셈이 가능해야 한다.', () => {
    clickNumber(999);
    cy.contains(MINUS).click();
    clickNumber(999);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: MINUS }));
  });

  it('2개의 숫자에 대해 곱셈이 가능해야 한다.', () => {
    clickNumber(999);
    cy.contains(MULTIPLICATION).click();
    clickNumber(999);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: MULTIPLICATION }));
  });

  it('2개의 숫자에 대해 나눗셈이 가능해야 한다.', () => {
    clickNumber(999);
    cy.contains(DIVISION).click();
    clickNumber(999);
    cy.contains('=').click();

    cy.get('#total').should('have.text', calculation({ num1: 999, num2: 999, operator: DIVISION }));
  });

  it('나눗셈을 할 때 소수점 이하는 버려야 한다.', () => {
    clickNumber(999);
    cy.contains(DIVISION).click();
    clickNumber(8);
    cy.contains('=').click();

    cy.get('#total').should('have.text', Math.floor(999 / 8));
  });

  it('숫자는 3자리까지만 입력이 가능해야 한다.', () => {
    clickNumber(9999);
    const stub = cy.stub()
    cy.on('window:alert', stub);
    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith('숫자는 최대 세자리까지만 입력 가능합니다.')
    })
  });

  it('"AC" 버튼을 클릭했을 때 결과화면이 0으로 초기화 되어야 한다.', () => {
    clickNumber(999);
    cy.contains('AC').click();

    cy.get('#total').should('have.text', INITIAL_VALUE);
  });
});
