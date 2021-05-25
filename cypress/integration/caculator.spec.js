import { OPERATORS, MAX_NUMBERS, MSG } from './../../src/js/utils/constants';
import { calculation } from './../../src/js/srcs/caculation';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  OPERATORS.push('=');

  const clickNumber = (number) => {
    cy.get('.digit').contains(number).click();
  };

  const clickOperation = (operation) => {
    cy.get('.operation').contains(operation).click();
  };

  const clickModifier = () => {
    cy.get('.modifier').contains('AC').click();
  };

  const pressButton = (expression) => {
    for (let exp of expression) {
      if (exp === 'C') {
        clickModifier();
      } else {
        OPERATORS.includes(exp) ? clickOperation(exp) : clickNumber(exp);
      }
    }
  };

  const actionPress = (expression) => {
    pressButton(expression);
  };

  const totalShouldHave = (value) => {
    cy.get('#total').should('have.text', value);
  };

  const alertMessage = (msg) => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal(msg);
    });
  };

  context('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    it('5 + 3 = 8', () => {
      actionPress('5+3=');
      totalShouldHave(calculation('5+3'));
    });

    it('10 + 20 = 30', () => {
      actionPress('10+20=');
      totalShouldHave(calculation('10+20'));
    });
  });

  context('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    it('5 - 3 = 2', () => {
      actionPress('5-3=');
      totalShouldHave(calculation('5-3'));
    });

    it('10 - 20 = -10', () => {
      actionPress('10-20=');
      totalShouldHave(calculation('10-20'));
    });
  });

  context('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    it('5 X 3 = 15', () => {
      actionPress('5X3=');
      totalShouldHave(calculation('5X3'));
    });

    it('5 X 0 = 0', () => {
      actionPress('5X0=');
      totalShouldHave(calculation('5X0'));
    });
  });

  context('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    it('6 / 3 = 2', () => {
      actionPress('6/3=');
      totalShouldHave(calculation('6/3'));
    });

    it('10 / 2 = 5', () => {
      actionPress('10/2=');
      totalShouldHave(calculation('10/2'));
    });
  });

  context('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    it('1 입력후 AC 누름', () => {
      actionPress('1C');
      totalShouldHave('0');
    });

    it('1/2 입력후 AC 누름', () => {
      actionPress('1/2C');
      totalShouldHave('0');
    });

    it('25X999-2 입력후 AC 누름', () => {
      actionPress('25X999-C');
      totalShouldHave('0');
    });
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    actionPress('1234');
    alertMessage(MSG.EXCEED_NUMBER_LENGTH);

    actionPress('+1234');
    alertMessage(MSG.EXCEED_NUMBER_LENGTH);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    actionPress('10/3=');
    totalShouldHave(calculation('10/3'));
  });

  it(`${MAX_NUMBERS}개의 숫자 이상 계산할 때`, () => {
    actionPress('1X1X');
    alertMessage(MSG.EXCEED_NUMBER_OF_NUMBERS);
  });

  it('연산자를 입력하고 다른 연산자를 누를 때', () => {
    actionPress('1+-X/');
    totalShouldHave('1/');
  });

  it('연산자를 중복 입력할 때', () => {
    actionPress('1+++');
    totalShouldHave('1+');
  });

  it('첫번째 숫자가 음수일 때 계산', () => {
    actionPress('1-2=');
    totalShouldHave(calculation('1-2'));
    actionPress('+4=');
    totalShouldHave(calculation('-1+4'));
  });

  it('1+0 에서 0 누르면 0이 중복 안되게', () => {
    actionPress('1+000');
    totalShouldHave('1+0');
  });

  it('1+0에서 0이 아닌 숫자 누르면 0이 없어지게', () => {
    actionPress('1+02');
    totalShouldHave('1+2');
  });

  it('0으로 나누면 알럿창', () => {
    actionPress('1/0=');
    alertMessage(MSG.DIVISION_0);
  });

  context('완성되지 않은 수식일 때', () => {
    it('1+=', () => {
      actionPress('1+=');
      alertMessage(MSG.IMPERFECT_EXPRESSION);
    });

    it('1-2=+=', () => {
      actionPress('1-2=+=');
      alertMessage(MSG.IMPERFECT_EXPRESSION);
    });
  });
});
