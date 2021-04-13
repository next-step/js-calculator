import {
  PLUS,
  MINUS,
  MULTIPLICATION,
  DIVISION,
  MAX_NUMBERS,
  MSG,
} from './../../src/js/util/constant';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  context('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('5 + 3 = 8', () => {
      cy.get('.digit').contains('5').click();
      cy.get('.operation').contains(PLUS).click();
      cy.get('.digit').contains('3').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '8');
    });

    it('10 + 20 = 30', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains(PLUS).click();
      cy.get('.digit').contains('2').click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '30');
    });
  });

  context('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('5 - 3 = 2', () => {
      cy.get('.digit').contains('5').click();
      cy.get('.operation').contains(MINUS).click();
      cy.get('.digit').contains('3').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '2');
    });

    it('10 - 20 = -10', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains(MINUS).click();
      cy.get('.digit').contains('2').click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '-10');
    });
  });

  context('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('5 X 3 = 15', () => {
      cy.get('.digit').contains('5').click();
      cy.get('.operation').contains(MULTIPLICATION).click();
      cy.get('.digit').contains('3').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '15');
    });

    it('5 X 0 = 0', () => {
      cy.get('.digit').contains('5').click();
      cy.get('.operation').contains(MULTIPLICATION).click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '0');
    });
  });

  context('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('6 / 3 = 2', () => {
      cy.get('.digit').contains('6').click();
      cy.get('.operation').contains(DIVISION).click();
      cy.get('.digit').contains('3').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '2');
    });

    it('10 / 2 = 5', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.digit').contains('0').click();
      cy.get('.operation').contains(DIVISION).click();
      cy.get('.digit').contains('2').click();
      cy.get('.operation').contains('=').click();
      cy.get('#total').should('have.text', '5');
    });
  });

  context('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    it('1 입력후 AC 누름', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.modifier').contains('AC').click();
      cy.get('#total').should('have.text', '0');
    });

    it('1/2 입력후 AC 누름', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.operation').contains(DIVISION).click();
      cy.get('.digit').contains('2').click();
      cy.get('.modifier').contains('AC').click();
      cy.get('#total').should('have.text', '0');
    });

    it('25X999-2 입력후 AC 누름', () => {
      cy.get('.digit').contains('2').click();
      cy.get('.digit').contains('5').click();
      cy.get('.operation').contains(MULTIPLICATION).click();
      cy.get('.digit').contains('9').click();
      cy.get('.digit').contains('9').click();
      cy.get('.digit').contains('9').click();
      cy.get('.operation').contains(MINUS).click();
      cy.get('.digit').contains('2').click();
      cy.get('.modifier').contains('AC').click();
      cy.get('#total').should('have.text', '0');
    });
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('4').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(MSG.EXCEED_NUMBER_LENGTH);
    });

    cy.get('.operation').contains(PLUS).click();

    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('4').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(MSG.EXCEED_NUMBER_LENGTH);
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains(DIVISION).click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it(`${MAX_NUMBERS}개의 숫자 이상 계산할 때`, () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(MULTIPLICATION).click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(MULTIPLICATION).click();
    cy.get('.digit').contains('1').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(MSG.EXCEED_NUMBER_OF_NUMBERS);
    });
  });

  it('연산자를 입력하고 다른 연산자를 누를 때', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('.operation').contains(MINUS).click();
    cy.get('.operation').contains(DIVISION).click();
    cy.get('#total').should('have.text', '1/');
  });

  it('연산자를 중복 입력할 때', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('#total').should('have.text', '1+');
  });

  it('첫번째 숫자가 음수일 때 계산', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(MINUS).click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '-1');
    cy.get('.operation').contains(PLUS).click();
    cy.get('.digit').contains('4').click();
    cy.get('.operation').contains('=').click();
    cy.get('#total').should('have.text', '3');
  });

  it('1+0 에서 0 누르면 0이 중복 안되게', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('.digit').contains('0').click();
    cy.get('.digit').contains('0').click();
    cy.get('.digit').contains('0').click();
    cy.get('#total').should('have.text', '1+0');
  });

  it('1+0에서 0이 아닌 숫자 누르면 0이 없어지게', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(PLUS).click();
    cy.get('.digit').contains('0').click();
    cy.get('.digit').contains('2').click();
    cy.get('#total').should('have.text', '1+2');
  });

  it('0으로 나누면 알럿창', () => {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains(DIVISION).click();
    cy.get('.digit').contains('0').click();
    cy.get('.operation').contains('=').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(MSG.DIVISION_0);
    });
  });

  context('완성되지 않은 수식일 때', () => {
    it('1+=', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.operation').contains(PLUS).click();
      cy.get('.operation').contains('=').click();

      cy.on('window:alert', (str) => {
        expect(str).to.equal(MSG.IMPERFECT_EXPRESSION);
      });
    });

    it('1-2=+=', () => {
      cy.get('.digit').contains('1').click();
      cy.get('.operation').contains(MINUS).click();
      cy.get('.digit').contains('2').click();
      cy.get('.operation').contains('=').click();
      cy.get('.operation').contains(PLUS).click();
      cy.get('.operation').contains('=').click();

      cy.on('window:alert', (str) => {
        expect(str).to.equal(MSG.IMPERFECT_EXPRESSION);
      });
    });
  });
});
