import { calculation } from '../../src/js/calculation.js';
import { ERR_MSG } from "../../src/js/utils.js"

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const clickMacroForCypress = (left, right, opt) =>{
    left.split('').forEach((x) => {
        cy.get('.digits').contains(x).click();
    })
    cy.get('.operation').contains(opt).click();
    right.split('').forEach((x) => {
        cy.get('.digits').contains(x).click();
    })
    cy.get('.operation').contains("=").click();
  }

  it('1.  2개의 숫자에 대해 덧셈이 가능하다.', () => {
    clickMacroForCypress("999", "999", "+");
    cy.get('#total').should('have.text', calculation(["999", "999", "+"]));
  });

  it('2.  2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    clickMacroForCypress("999", "999", "-");
    cy.get('#total').should('have.text', calculation(["999", "999", "-"]));
  });

  it('3. 2개의 숫자에 대해 곱셈이 가능하다.', () => {
    clickMacroForCypress("999", "999", "X");
    cy.get('#total').should('have.text', calculation(["999", "999", "X"]));
  });

  it('4. 2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    clickMacroForCypress("999", "999", "/");
    cy.get('#total').should('have.text', calculation(["999", "999", "/"]));
  });

  it('5. AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.get('.digits').contains('1').click();
    cy.get('.digits').contains('2').click();
    cy.get('.digits').contains('3').click();
    cy.contains('AC').click();

    cy.get('#total').should('have.text', "0");
  });

  it('6. 숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));

    cy.get('.digits').contains('1').click();
    cy.get('.digits').contains('2').click();
    cy.get('.digits').contains('3').click();
    cy.get('.digits').contains('4').click();

    cy.get('@windowAlert').should('be.calledWith', ERR_MSG.INPUT_SIZE);
  });
  
  it('7. 계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    clickMacroForCypress("123", "10", "/");
    cy.get('#total').should('have.text', Math.floor(123 / 10));
  });

});
