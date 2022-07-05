import {
  AFTER_ENTER_NUMBER_FIRST,
  LENGTH_LIMIT_TEXT,
  OPERATORS,
} from '../../src/js/constants';

const getTotal = () => cy.get('#total');
const getDigit = () => cy.get('.digit');
const getOperation = () => cy.get('.operation');

const checkTotalText = (text) => getTotal().should('have.text', text);
const clickDigit = (digit) => getDigit().contains(digit).click();
const clickOperator = (operation) => getOperation().contains(operation).click();
const allClear = () => cy.get('.modifier').click();

const onOccurAlert = (text) =>
  cy.on('window:alert', (alert) => expect(alert).to.contains(text));

const { plus, minus, multiplication, divide, equal } = OPERATORS;

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('#total이 초기값인경우', () => {
    it('항상 0이 화면에 출력된다.', () => {
      checkTotalText('0');
    });

    it('연산자를 누르면 숫자먼저입력 alert가 나오고 기존 입력값이 그대로출력된다.', () => {
      clickOperator(plus);
      onOccurAlert(AFTER_ENTER_NUMBER_FIRST);
      checkTotalText('0');
    });
  });

  describe('숫자를 누를 경우', () => {
    it('선택한 숫자가 #title에 출력된다.', () => {
      const num = 5;
      clickDigit(num);
      checkTotalText(num);
    });

    it('누른 횟수만큼 눌러진 숫자가 문자열로 합쳐져 #title에 입력된다.', () => {
      clickDigit(1);
      clickDigit(1);
      checkTotalText('11');
      clickDigit(9);
      checkTotalText('119');
    });

    it('3자리 이후에 입력된 숫자는 길이제한 alert 이후 무시된다(좌항)', () => {
      clickDigit(2);
      clickDigit(2);
      clickDigit(2);
      onOccurAlert(LENGTH_LIMIT_TEXT);
      checkTotalText('222');
    });

    describe('좌항이 존재할경우', () => {
      it('좌항의 숫자이후 연산자가 존재할경우 우항에3자리 이후에 입력된 숫자는 길이제한 alert 이후, 무시된다', () => {
        clickDigit(2);
        clickDigit(2);
        clickDigit(2);
        clickOperator(plus);
        clickDigit(3);
        clickDigit(3);
        clickDigit(3);
        clickDigit(3);
        onOccurAlert(LENGTH_LIMIT_TEXT);
        checkTotalText('222+333');
      });
    });
  });

  describe('= 버튼을 누를 경우', () => {
    describe('입력값에', () => {
      it('"0"만 존재할 경우 #title은 기존 값 "0"으로 유지된다.', () => {
        clickOperator(equal);
        checkTotalText('0');
      });

      it('연산자없이 숫자만 존재할 경우 #title은 현재 입력값이 그대로 출력 된다.', () => {
        clickDigit(1);
        clickDigit(9);
        clickOperator(equal);
        checkTotalText('19');
      });

      it('연산자 이전에 숫자가 존재하고 연산자 이후에 숫자가 존재하지 않을경우 현재 입력값이 그대로 출력 된다.', () => {
        clickDigit(1);
        clickDigit(9);
        clickOperator(plus);
        clickOperator(equal);
        checkTotalText('19+');
      });
    });

    describe('이항 연산인 경우', () => {
      it('2개의 숫자에 대해 덧셈이 계산된 결과가 출력된다.', () => {
        clickDigit(1);
        clickDigit(9);
        clickOperator(plus);
        clickDigit(2);
        clickDigit(1);
        clickOperator(equal);
        checkTotalText('40');
      });

      it('2개의 숫자에 대해 뺄셈이 계산된 결과가 출력된다.', () => {
        clickDigit(1);
        clickDigit(5);
        clickOperator(minus);
        clickDigit(3);
        clickDigit(5);
        clickOperator(equal);
        checkTotalText('-20');
      });

      it('2개의 숫자에 대해 곱셈이 계산된 결과가 출력된다.', () => {
        clickDigit(1);
        clickDigit(0);
        clickOperator(multiplication);
        clickDigit(2);
        clickDigit(0);
        clickOperator(equal);
        checkTotalText('200');
      });

      it('2개의 숫자에 대해 나눗셈이 계산된 결과가 출력된다.', () => {
        clickDigit(3);
        clickDigit(0);
        clickOperator(divide);
        clickDigit(1);
        clickDigit(0);
        clickOperator(equal);
        checkTotalText('3');
      });

      describe('연산의 결과에 소수점이 존재할 경우', () => {
        it('연산결과의 소수점을 제거하고 출력한다.', () => {
          clickDigit(2);
          clickDigit(6);
          clickOperator(divide);
          clickDigit(4);
          clickOperator(equal);
          checkTotalText('6');
        });
      });
    });
  });

  describe('AC버튼을 눌렀을 경우', () => {
    it('"0"만 존재할 때 AC를 누르면 #title은 "0"으로 초기화된다.', () => {
      allClear();
      checkTotalText('0');
    });

    it('"0"이 아닌 다른 숫자가 #title에 존재할 경우 #title은 "0"으로 초기화된다.', () => {
      const num = 9;
      clickDigit(num);
      allClear();
      checkTotalText('0');
    });
  });
});
