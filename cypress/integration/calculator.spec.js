import { calcOperation } from '../../src/js/utils/operation.js';

const generateRandomNumber = () => Math.floor(Math.random() * 9) + 1;
const getDataEl = target => `[data-value="${target}"]`;
const doSeveralTime = (n, callback) => {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
};

const dataSet = {
  ['+']: [
    [1, '+', 2, '='],
    [7, 3, '+', 8, 4, '='],
    [6, 3, 3, '+', 2, 5, 4, '='],
  ],
  ['-']: [
    [1, '-', 2, '='],
    [7, 3, '-', 8, 4, '='],
    [6, 3, 3, '-', 2, 5, 4, '='],
  ],
  ['X']: [
    [1, 'X', 2, '='],
    [7, 3, 'X', 8, 4, '='],
    [6, 3, 3, 'X', 2, 5, 4, '='],
  ],
  ['/']: [
    [1, '/', 2, '='],
    [7, 3, '/', 8, 4, '='],
    [6, 3, 3, '/', 2, 5, 4, '='],
  ],
};

let numbers = [];

describe('계산기 Cypress Test', () => {
  const calc = operator => {
    const operands = ['', ''];
    doSeveralTime(2, i => {
      cy.get(`@number${i}`).click();
      operands[0] += numbers[i];
    });
    cy.get(`${getDataEl(operator)}`).click();
    doSeveralTime(1, i => {
      cy.get(`@number${i}`).click();
      operands[1] += numbers[i];
    });

    cy.get('@calculateBtn').click();
    cy.get('#total').should(
      'have.text',
      calcOperation(operands[0], operands[1])[operator]()
    );
  };

  beforeEach(() => {
    cy.visit('/');

    // alias declare
    cy.get(`${getDataEl('=')}`).as('calculateBtn');
    cy.get('.modifier').as('acBtn');

    // generating numbers
    numbers = [];
    doSeveralTime(5, i => {
      const randomNumber = generateRandomNumber();
      cy.get(`${getDataEl(randomNumber)}`).as(`number${i}`);
      numbers.push(randomNumber);
    });
  });

  const testCalc = operation => {
    for (const testCase of dataSet[operation]) {
      for (const operand of testCase) {
        cy.get(`${getDataEl(operand)}`).click();
      }
      const operandArr = testCase
        .slice(0, testCase.length - 1)
        .join('')
        .split(operation);
      const operateResult = calcOperation(operandArr[0], operandArr[1])[
        operation
      ]();
      cy.get('#total').should('have.text', operateResult);
    }
  };

  context('사칙 연산 테스트', () => {
    it.only('1. 2개의 숫자에 대해 덧셈이 가능하다.', () => {
      testCalc('+');
    });

    it('2. 2개의 숫자에 대해 뺄셈이 가능하다.', () => {
      calc('-');
    });

    it('3. 2개의 숫자에 대해 곱셈이 가능하다.', () => {
      calc('X');
    });

    it('4. 2개의 숫자에 대해 나눗셈이 가능하다.', () => {
      calc('/');
    });
  });

  context('제약 사항 테스트', () => {
    it('5. AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
      doSeveralTime(3, i => {
        cy.get(`@number${i}`).click();
      });
      cy.get('@acBtn').click();
      cy.get('#total').should('have.text', 0);
    });

    it('6. 숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
      doSeveralTime(5, i => {
        cy.get(`@number${i}`).click();
      });
      cy.get('#total').invoke('text').should('have.length', 3);
    });

    it('7. 계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
      calc('/');
    });
  });
});
