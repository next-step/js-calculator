const BASE_URL = '../index.html';

const clickToDigit = digit => cy.get('.digit').contains(digit).click();
const clickToOperator = operator => cy.get('.operation').contains(operator).click();
const clickToAC = () => cy.get('.modifier').click();
const checkTotalText = text => cy.get('#total').should('have.text', text);

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('최초 #total에 출력되는 숫자는 0이다.', () => {
    it('숫자를 누르면 #title에 나온다..', () => {
      const num = 1;
      clickToDigit(num);
      checkTotalText(num);
    });

    it('연산자를 누르면 [alert] 경고창이 뜨고 #title은 기존 값으로 유지된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      // alert
      clickToOperator('/')
        .then(() => {
          checkTotalText(0);
          expect(alertStub).to.be.called;
        });
    });
  });

  describe('숫자만 입력한다.', () => {
    it('숫자 두 개를 누르면 #title에 입력된다.', () => {
      clickToDigit(1);
      clickToDigit(2);
      checkTotalText(12);
    });

    it('숫자는 세자리 수만 입력할 수 있다. 초과 시 [alert] 경고창이 뜨고 #title은 기존 값으로 유지된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      // alert
      clickToDigit(1);
      clickToDigit(2);
      clickToDigit(0);
      clickToDigit(4)
        .then(() => {
          checkTotalText(120);
          expect(alertStub).to.be.called;
        });
    });
  });

  describe('숫자와 연산자를 입력한다.', () => {
    it('숫자를 누르고 연산자를 누르면 #title에 입력된다.', () => {
      clickToDigit(1);
      clickToOperator('+');
      checkTotalText('1+');
    });

    it('연산자는 연속될 수 없으므로 마지막 연산자는 무시된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      // alert
      clickToDigit(1);
      clickToOperator('+');
      clickToOperator('-')
        .then(() => {
          checkTotalText('1+');
          expect(alertStub).to.be.called;
        });
    });

    it('좌항 완성(연산자 포함) 후 우항 입력 시 숫자는 최대 세자리만 입력된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      // alert
      clickToDigit(1);
      clickToDigit(2);
      clickToDigit(3);
      clickToOperator('+');
      clickToDigit(3);
      clickToDigit(2);
      clickToDigit(1);
      clickToDigit(4)
        .then(() => {
          checkTotalText('123+321');
          expect(alertStub).to.be.called;
        });
    });
  });

  describe('= 를 눌러 연산한다.', () => {
    it('0만 존재할 때 = 를 누르면 #title은 기존 값으로 유지된다.', () => {
      clickToOperator('=');
      checkTotalText('0');
    });

    it('좌항만(연산자 포함) 존재할 때 = 를 누르면 #title은 좌항 값으로 입력된다.', () => {
      clickToDigit(1);
      clickToDigit(2);
      clickToOperator('+');
      clickToOperator('=');
      checkTotalText(12);
    });

    describe('이항 연산이 가능하다.', () => {
      it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        clickToDigit(1);
        clickToDigit(2);
        clickToOperator('+');
        clickToDigit(2);
        clickToDigit(1);
        clickToOperator('=');
        checkTotalText(33);
      });

      it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        clickToDigit(1);
        clickToDigit(2);
        clickToOperator('-');
        clickToDigit(2);
        clickToDigit(1);
        clickToOperator('=');
        checkTotalText('-9');
      });

      it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        clickToDigit(1);
        clickToDigit(2);
        clickToOperator('X');
        clickToDigit(2);
        clickToDigit(1);
        clickToOperator('=');
        checkTotalText(252);
      });

      it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        clickToDigit(1);
        clickToDigit(2);
        clickToOperator('/');
        clickToDigit(4);
        clickToOperator('=');
        checkTotalText(3);
      });

      it('나눗셈의 결과가 소수인 경우 소수점 이하는 버린다.', () => {
        clickToDigit(9);
        clickToOperator('/');
        clickToDigit(6);
        clickToOperator('=');
        checkTotalText(1);
      });
    });

    describe('다항 연산이 가능하다.', () => {
      it('3항 연산, 덧셈과 뺄셈은 순차적으로 계산한다.', () => {
        clickToDigit(9);
        clickToOperator('+');
        clickToDigit(6);
        clickToOperator('-');
        clickToDigit(2);
        clickToOperator('=');
        checkTotalText(13);
      });

      it('4항 연산, 곱셈과 나눗셈을 우선 계산한다.', () => {
        clickToDigit(9);
        clickToOperator('X');
        clickToDigit(2);
        clickToOperator('-');
        clickToDigit(7);
        clickToDigit(2);
        clickToOperator('/');
        clickToDigit(6);
        clickToOperator('=');
        checkTotalText(6);
      });

      it('3X3X3X 는 0이 아닌 27이다.', () => {
        clickToDigit(3);
        clickToOperator('X');
        clickToDigit(3);
        clickToOperator('X');
        clickToDigit(3);
        clickToOperator('X');
        clickToOperator('=');
        checkTotalText(27);
      });

      it('3X3X3/ 는 Infinity가 아닌 27이다.', () => {
        clickToDigit(3);
        clickToOperator('X');
        clickToDigit(3);
        clickToOperator('X');
        clickToDigit(3);
        clickToOperator('/');
        clickToOperator('=');
        checkTotalText(27);
      });
    });
  });

  describe('AC를 누른다.', () => {
    it('0만 존재할 때 AC를 누르면 #title은 기존 값으로 유지된다.', () => {
      clickToAC();
      checkTotalText(0);
    });

    it('다른 값이 존재할 때 AC를 누르면 #title은 0으로 초기화 된다.', () => {
      clickToDigit(2);
      clickToAC();
      checkTotalText(0);
    });
  });
});
