import { ERROR } from '../../src/js/constants/index.js';

describe('Test calculate', function () {
  it('2개의 숫자에 대해 덧셈이 가능하다.', function () {
    cy.visit('/');
    cy.get('.digit').contains('2').click();
    cy.get('#plus').click();
    cy.get('.digit').contains('3').click();
    cy.get('#equal').click();
    cy.contains('#total', '5');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', function () {
    cy.get('#minus').click();
    cy.get('.digit').contains('1').click();
    cy.get('#equal').click();
    cy.contains('#total', '4');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', function () {
    cy.get('#multiply').click();
    cy.get('.digit').contains('2').click();
    cy.get('#equal').click();
    cy.contains('#total', '8');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', function () {
    cy.get('#divide').click();
    cy.get('.digit').contains('2').click();
    cy.get('#equal').click();
    cy.contains('#total', '4');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', function () {
    cy.get('#divide').click();
    cy.get('.digit').contains('3').click();
    cy.get('#equal').click();
    cy.contains('#total', '1');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', function () {
    cy.get('#modifier').click();
    cy.contains('#total', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', function () {
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('3').click();

    cy.contains('#total', '333');
    cy.on('window:alert', (text) => {
      expect(text).to.contains(ERROR.OVER_MAX_DIGIT(3));
    });
  });
});
