import { OPERATION, MESSAGE } from '../../src/js/constants.js';

describe('Calculator feature test', () => {
  it('renders calculator', () => {
    cy.visit('/');
    cy.get('.calculator');
  });

  it('initializes screen with 0', () => {
    cy.get('#screen').should('have.text', '0');
  });

  it('renders digit in screen up to three digits', () => {
    cy.get('.digit[data-value="1"]').click();
    cy.get('#screen').should('have.text', '1');

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '12');

    cy.get('.digit[data-value="3"]').click();
    cy.get('#screen').should('have.text', '123');

    cy.get('.digit[data-value="4"]').click();
    cy.get('#screen').should('have.text', '123');
  });

  it('initializes when AC is clicked', () => {
    cy.get('.modifier').click();
    cy.get('#screen').should('have.text', '0');
  });

  it('renders second number after operator is clicked', () => {
    cy.get('.digit[data-value="1"]').click();
    cy.get('#screen').should('have.text', '1');

    cy.get('.operation[data-operation="plus"]').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');
  });

  it('adds two numbers properly', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('#screen').should('have.text', '1');

    cy.get('.operation[data-operation="plus"]').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '3');
  });

  it('subtracts two numbers properly', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');

    cy.get('.operation[data-operation="minus"]').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('#screen').should('have.text', '1');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '1');
  });

  it('multiplies two numbers properly', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');

    cy.get('.operation[data-operation="multiply"]').click();

    cy.get('.digit[data-value="4"]').click();
    cy.get('#screen').should('have.text', '4');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '8');
  });

  it('divides two numbers properly', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('.digit[data-value="0"]').click();
    cy.get('#screen').should('have.text', '10');

    cy.get('.operation[data-operation="divide"]').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '5');
  });

  it('shows Infinity when divided by zero', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('.digit[data-value="0"]').click();
    cy.get('#screen').should('have.text', '10');

    cy.get('.operation[data-operation="divide"]').click();

    cy.get('.digit[data-value="0"]').click();
    cy.get('#screen').should('have.text', '0');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', 'Infinity');
  });

  it('rounds down division results', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('.digit[data-value="5"]').click();
    cy.get('#screen').should('have.text', '15');

    cy.get('.operation[data-operation="divide"]').click();

    cy.get('.digit[data-value="4"]').click();
    cy.get('#screen').should('have.text', '4');

    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '3');
  });

  it('resets when digit is clicked after equals operation', () => {
    cy.get('.modifier').click();

    cy.get('.digit[data-value="1"]').click();
    cy.get('.operation[data-operation="plus"]').click();
    cy.get('.digit[data-value="2"]').click();
    cy.get('.operation[data-operation="equals"]').click();

    cy.get('.digit[data-value="2"]').click();
    cy.get('#screen').should('have.text', '2');
    cy.get('.operation[data-operation="multiply"]').click();
    cy.get('.digit[data-value="3"]').click();
    cy.get('.operation[data-operation="equals"]').click();
    cy.get('#screen').should('have.text', '6');
  });

  it('fires alert when inputs are invalid', () => {
    let alertCount = 0;

    cy.get('.modifier').click();

    cy.on('window:alert', text => {
      alertCount++;
      expect(text).to.equal(MESSAGE.INVALID_INPUT);
    });

    cy.get('.operation[data-operation="equals"]')
      .click()
      .then(() => expect(alertCount).to.equal(1));

    cy.get('.digit[data-value="1"]').click();
    cy.get('.operation[data-operation="equals"]')
      .click()
      .then(() => expect(alertCount).to.equal(2));

    cy.get('.operation[data-operation="plus"]').click();
    cy.get('.operation[data-operation="equals"]')
      .click()
      .then(() => expect(alertCount).to.equal(3));
  });
});
