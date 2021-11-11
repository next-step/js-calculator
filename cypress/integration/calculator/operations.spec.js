describe('사칙 연산', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="seven"]')
          .click();
        cy.get('[data-operator="PLUS"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-operator="EQUAL"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '10');
    });

    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="seven"]')
          .click();
        cy.get('[data-operator="MINUS"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-operator="EQUAL"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '4');
    });

    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="seven"]')
          .click();
        cy.get('[data-operator="MULTIPLE"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-operator="EQUAL"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '21');
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="six"]')
          .click();
        cy.get('[data-operator="DIVIDE"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-operator="EQUAL"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '2');
    });

    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        cy.get('[data-test="total"]')
          .should('have.text', '0');

        cy.get('[data-test="seven"]')
          .click();
        cy.get('[data-operator="DIVIDE"]')
          .click();
        cy.get('[data-test="three"]')
          .click();
        cy.get('[data-operator="EQUAL"]')
          .click();

        cy.get('[data-test="total"]')
          .should('have.text', '2');
    });
});
