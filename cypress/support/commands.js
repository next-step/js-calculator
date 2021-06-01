import { randomVal, randomOp, clickLog } from './functions.js';

Cypress.Commands.add('plusTest', (times) => {
  cy.calculatorTest('+', times);
});

Cypress.Commands.add('minusTest', (times) => {
  cy.calculatorTest('-', times);
});

Cypress.Commands.add('multiplyTest', (times) => {
  cy.calculatorTest('X', times);
});

Cypress.Commands.add('divideTest', (times) => {
  cy.calculatorTest('/', times);
});

Cypress.Commands.add('any', { prevSubject: 'element' }, (subject, size = 1) => {
  let value = '';
  cy.wrap(subject).then((elementList) => {
    elementList = elementList.jquery ? elementList.get() : elementList;
    elementList = Cypress._.sampleSize(elementList, size);
    elementList = elementList.length > 1 ? elementList : elementList[0];
    if (elementList.length > 1) {
      elementList.forEach((element) => (value += element.innerText));
    } else value += elementList.innerText;
    cy.wrap(elementList);
    clickLog('선택된 숫자', value);
  });
});

Cypress.Commands.add('clickOp', (op = randomOp()) => {
  cy.get('.operations', { log: false })
    .contains(op, { log: false })
    .click({ log: false });
  clickLog('연산', op);
});

Cypress.Commands.add('run', (answer) => {
  cy.get('.operations', { log: false })
    .contains('=', { log: false })
    .click({ log: false });
});

Cypress.Commands.add('clickDigits', (digits) => {
  String(digits)
    .split('')
    .forEach((digit) =>
      cy.get(`[data-cy=${digit}]`, { log: false }).click({ log: false })
    );
  clickLog('value', digits);
});

Cypress.Commands.add('clear', () => {
  cy.get('[data-cy="AC"]', { log: false }).click({ log: false });
});

Cypress.Commands.add('calculatorTest', (op, times) => {
  for (let i = 0; i < times; i++) {
    cy.clear();
    const leftSide = randomVal(0, 1000);
    const rightSide = randomVal(0, 1000);
    const answer = Math.floor(
      eval(`${leftSide} ${op === 'X' ? '*' : op} ${rightSide}`)
    );
    cy.clickDigits(leftSide);
    cy.clickOp(op);
    cy.clickDigits(rightSide);
    cy.run(answer);
    cy.get('#total', { log: false }).should('have.text', String(answer));
  }
});

Cypress.Commands.add('allClearTest', (times) => {
  for (let i = 0; i < times; i++) {
    cy.clickDigits(randomVal(0, 1000));
    cy.clear();
    cy.get('#total', { log: false }).should('have.text', '0');
  }
});
