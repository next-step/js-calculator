import { getRandomNumber, operation } from '../../src/js/utils';
import { ALERT_MESSAGE, OPERATIONS } from '../../src/js/constants';

const BASE_URL = 'http://127.0.0.1:5500/';

before(() => {
  cy.visit(BASE_URL);
});

describe('계산기 미션 테스트', () => {
  const testCase = [[77, 7]];
  const operator = (description, operationFunc, operation) => {
    it(description, () => {
      testCase.forEach(([firstNumber, secondNumber]) => {
        cy.clickMultiNumber(firstNumber);
        cy.clickOperation(operation);
        cy.clickMultiNumber(secondNumber);
        cy.clickOperation(OPERATIONS.EQUAL);

        cy.getResult(operationFunc(firstNumber, secondNumber));
      });
    });
  };

  beforeEach(() => {
    cy.clickModifier();
  });

  operator(
    '2개의 숫자에 대해 덧셈이 가능하다.',
    operation[OPERATIONS.ADD],
    OPERATIONS.ADD,
  );

  operator(
    '2개의 숫자에 대해 뺄셈이 가능하다.',
    operation[OPERATIONS.SUBTRACT],
    OPERATIONS.SUBTRACT,
  );
  operator(
    '2개의 숫자에 대해 곱셈이 가능하다.',
    operation[OPERATIONS.MULTIFLY],
    OPERATIONS.MULTIFLY,
  );
  operator(
    '2개의 숫자에 대해 나눗셈이 가능하다.',
    operation[OPERATIONS.DIVIDE],
    OPERATIONS.DIVIDE,
  );

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const firstNumber = getRandomNumber();
    const secondNumber = getRandomNumber();

    cy.clickNumber(firstNumber);
    cy.clickOperation(OPERATIONS.ADD);
    cy.clickNumber(secondNumber);
    cy.clickModifier();

    cy.getResult('0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.clickMultiNumber(7777).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.MAX_NUMBER);
    });
  });
});
