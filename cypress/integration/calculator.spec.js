const clickNumber = (digits) => {
    const digitsString = String(digits);
    let i;
    for (i = 0; i < digitsString.length; i++) {
        cy.get('.digits').contains(digitsString[i]).click();
    }
};

describe('ui-calculator', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500/index.html');
    });

    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        clickNumber(111);
        cy.get('.operations').contains('+').click();
        clickNumber(222);
        cy.get('.operations').contains('=').click();
        cy.get('#total').should('have.text', '333');
    });
    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        clickNumber(111);
        cy.get('.operations').contains('-').click();
        clickNumber(222);
        cy.get('.operations').contains('=').click();
        cy.get('#total').should('have.text', '-111');
    });
    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        clickNumber(111);
        cy.get('.operations').contains('X').click();
        clickNumber(222);
        cy.get('.operations').contains('=').click();
        cy.get('#total').should('have.text', '24642');
    });
    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        clickNumber(222);
        cy.get('.operations').contains('/').click();
        clickNumber(111);
        cy.get('.operations').contains('=').click();
        cy.get('#total').should('have.text', '2');
    });
    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        clickNumber(222);
        cy.get('.modifier').click();
        cy.get('#total').should('have.text', '0');
    });
    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.(앞 숫자)', () => {
        clickNumber(2223);
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('숫자는 3자리까지만 입력이 가능합니다.');
        });
        cy.get('.operations').contains('/').click();
        clickNumber(1111);
    });
    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        clickNumber(222);
        cy.get('.operations').contains('/').click();
        clickNumber(100);
        cy.get('.operations').contains('=').click();
        cy.get('#total').should('have.text', '2');
    });
});
