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


describe('계산기 Cypress Test', () => {
  beforeEach(() => {
    cy.visit('/');

    // alias declare
    cy.get(`${getDataEl('=')}`).as('calculateBtn');
    cy.get('.modifier').as('acBtn');
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
    it('1. 2개의 숫자에 대해 덧셈이 가능하다.', () => {
      testCalc('+');
    });

    it('2. 2개의 숫자에 대해 뺄셈이 가능하다.', () => {
      testCalc('-');
    });

    it('3. 2개의 숫자에 대해 곱셈이 가능하다.', () => {
      testCalc('X');
    });

    it('4. 2개의 숫자에 대해 나눗셈이 가능하다.', () => {
      testCalc('/');
    });
  });

  context.only('제약 사항 테스트', () => {
    it('5. AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
      doSeveralTime(5, i => {
        const randomNumber = generateRandomNumber();
        cy.get(`${getDataEl(randomNumber)}`).click();
      });
      cy.get('@acBtn').click();
      cy.get('#total').should('have.text', 0);
    });

    it('6. 숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
      doSeveralTime(5, i => {
        const randomNumber = generateRandomNumber();
        cy.get(`${getDataEl(randomNumber)}`).click();
      });
      cy.get('#total').invoke('text').should('have.length', 3);
    });

    it('7. 계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
      testCalc('/');
    });
  });
});
