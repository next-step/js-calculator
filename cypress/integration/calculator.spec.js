import { INVALID_LENGTH,NOT_ENTER_NUMBER,NOT_OVERLAP_NUMBER } from '../../src/js/validation.js';

const getNumber = (numbers) => numbers.map(number=>cy.get('.digits').contains(number).click())
const getOperator = (operator) => cy.get('.operations').contains(operator).click()
const getAnswer = (answer) => cy.get('#total').should('have.text', answer);

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });
  it('숫자버튼을 눌렀을 경우 결과디스플레이에 제대로 표시되는지 테스트 한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['1'])
      getAnswer('1')
    });
  });

  it('숫자버튼 입력 후 연산자를 클릭했을 경우 결과디스플레이에 제대로 표시되는지 테스트 한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['1'])
      getOperator('/')
      getAnswer('1/');
    });
  });

  it('네자리 이상의 숫자가 입력됐을 경우 경고메세지가 뜬다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#total').then(() => {
      
      getNumber(['1','1','1'])
      cy.get('.digits')
        .contains('1')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(INVALID_LENGTH);
        });
      getOperator('/')
      getNumber(['1','1','1'])
      cy.get('.digits')
        .contains('1')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(INVALID_LENGTH);
        });

      getAnswer('111/111');
    });
  });

  it('덧셈 연산 1 + 999의 결과값이 1000이 나오는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['1'])
      getOperator('+')

      getNumber(['9'])
      getNumber(['9'])
      getNumber(['9'])

      getOperator('=')

      getAnswer('1000');
    });
  });

  it('뺄셈 연산 999 - 998의 결과값이 1이 나오는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['9','9','9'])
      getOperator('-')
      getNumber(['9','9','8'])
      getOperator('=')

      getAnswer('1');
    });
  });

  it('곱셈 연산 999 * 999 의 결과값이 998001이 나오는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['9','9','9'])
      getOperator('X')
      getNumber(['9','9','9'])

      getOperator('=')

      getAnswer('998001');
    });
  });

  it('나눗셈 연산 500 / 10 의 결과값이 50이 나오는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['5','0','0'])
      getOperator('/')

      getNumber(['1','0'])

      getOperator('=')

      getAnswer('50');
    });
  });

  it('나눗셈 연산 999 / 10 의 결과값이 99이 나오는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['9','9','9'])

      getOperator('/')

      getNumber(['1','0'])

      getOperator('=')

      getAnswer('99');
    });
  });

  it('AC버튼 클릭시 결과디스플레이의 값이 0으로 초기화되는지 확인한다.', () => {
    cy.get('#total').then(() => {
      getNumber(['9','9','9'])
      getOperator('/')
      getNumber(['5'])
      cy.get('.modifier').click();

      getAnswer('0');
    });
  });

  it('처음에 연산자를 먼저 입력하는 경우 경고메세지가 뜬다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getOperator('/').then(() => {
      expect(stub.getCall(0)).to.be.calledWith(NOT_ENTER_NUMBER);
    });
  });

  it('연산자를 중복 입력하는 경우 경고메세지가 뜬다.', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    getNumber(['9','9','9'])
    getOperator('/')
    getOperator('/').then(() => {
      expect(stub.getCall(0)).to.be.calledWith(NOT_OVERLAP_NUMBER);
    });
  });

  it('계산 결과가 음수가 나오는 경우', () => {
    getNumber(['3'])
    getOperator('-')
    getNumber(['5'])
    getOperator('=')
    getAnswer('-2');
  });

  it('계산 결과가 소수점이 나올 경우엔 소수점 이하는 버림한다.', () => {
    getNumber(['5'])
    getOperator('/')
    getNumber(['3'])
    getOperator('=')
    getAnswer(Math.floor(5 / 3));
  });

});
