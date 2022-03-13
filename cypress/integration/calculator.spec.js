import { calcOperation } from '../../src/js/utils/operation.js';

const generateRandomNumber = () => Math.floor(Math.random() * 9) + 1;
const getDataEl = target => `[data-value="${target}"]`;
const doSeveralTime = (n, callback) => {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
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
    return new Cypress.Promise(() => {});
  };

  beforeEach(() => {
    cy.visit('/');
    // 랜덤 숫자 제너레이팅
    numbers = [];
    doSeveralTime(5, i => {
      const randomNumber = generateRandomNumber();
      cy.get(`${getDataEl(randomNumber)}`).as(`number${i}`);
      numbers.push(randomNumber);
    });
    cy.get(`${getDataEl('=')}`).as('calculateBtn');
    cy.get('.modifier').as('acBtn');
    cy.get('@acBtn').click();
  });

  context('사칙 연산 테스트', () => {
    beforeEach(() => {});

    it('1. 2개의 숫자에 대해 덧셈이 가능하다.', () => {
      calc('+');
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
      calc('/').then(el => {
        cy.get('#total').should(
          'have.text',
          Math.floor(calcOperation(numbers[0], numbers[1])[operator]())
        );
      });
    });
  });
});
