import { errorMessages } from '../../src/js/calculator';

describe('calculator', () => {
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.visit('/');

    cy.clicks('123+456');
    cy.findByRole('heading').should('have.text', '123+456');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 123 + 456);
    cy.clicks('+789');
    cy.findByRole('heading').should('have.text', `${123 + 456}+789`);
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 123 + 456 + 789);
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.clicks('789-456');
    cy.findByRole('heading').should('have.text', '789-456');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 789 - 456);
    cy.clicks('-123');
    cy.findByRole('heading').should('have.text', `${789 - 456}-123`);
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 789 - 456 - 123);
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.clicks('12X45');
    cy.findByRole('heading').should('have.text', '12X45');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 12 * 45);
    cy.clicks('X78');
    cy.findByRole('heading').should('have.text', `${12 * 45}X78`);
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 12 * 45 * 78);
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.clicks('768/2');
    cy.findByRole('heading').should('have.text', '768/2');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 768 / 2);
    cy.clicks('/3');
    cy.findByRole('heading').should('have.text', `${768 / 2}/3`);
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', 768 / 2 / 3);
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.clicks('1/3');
    cy.findByRole('heading').should('have.text', '1/3');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', parseInt(1 / 3, 10));
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
    cy.clicks('15/4');
    cy.findByRole('heading').should('have.text', '15/4');
    cy.clicks('=');
    cy.findByRole('heading').should('have.text', parseInt(15 / 4, 10));
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const string = '1234';

    cy.clicks(string);
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessages.MAX_LENGTH_ERROR);
    });
    cy.findByRole('heading').should('have.text', string.substring(0, 3));
    cy.clicks('X9=');
    cy.findByRole('heading').should('have.text', +string.substring(0, 3) * 9);
    cy.clicks('0');
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessages.MAX_LENGTH_ERROR);
    });
    cy.clicks('AC', { atom: true });
    cy.findByRole('heading').should('have.text', 0);
  });
});
