describe('js-calculator', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5501/js-calculator/')
    })

    context('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        it('4 + 2 = 6', () => {
            cy.get('.digit').contains('4').click();
            cy.get('.operation').contains('+').click();
            cy.get('.digit').contains('2').click();
            cy.get('.operation').contains('=').click();
            cy.get('#total').should('have.text', '6');
        })

        it('99 + 1 = 100', () => {
            cy.get('.digit').contains('9').click();
            cy.get('.digit').contains('9').click();
            cy.get('.operation').contains('+').click();
            cy.get('.digit').contains('1').click();
            cy.get('.operation').contains('=').click();
            cy.get('#total').should('have.text', '100');
        })

        it('123 + 456 = 579', () => {
            cy.get('.digit').contains('1').click();
            cy.get('.digit').contains('2').click();
            cy.get('.digit').contains('3').click();
            cy.get('.operation').contains('+').click();
            cy.get('.digit').contains('4').click();
            cy.get('.digit').contains('5').click();
            cy.get('.digit').contains('6').click();
            cy.get('.operation').contains('=').click();
            cy.get('#total').should('have.text', '579');
        })
    });

    context('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        it('4 + 2 = 6', () => {
            cy.get('.digit').contains('4').click();
            cy.get('.operation').contains('-').click();
            cy.get('.digit').contains('2').click();
            cy.get('.operation').contains('=').click();
            cy.get('#total').should('have.text', '2');
        })

        it('30 - 40 = -10', () => {
            cy.get('.digit').contains('3').click();
            cy.get('.digit').contains('0').click();
            cy.get('.operation').contains('-').click();
            cy.get('.digit').contains('4').click();
            cy.get('.digit').contains('0').click();
            cy.get('.operation').contains('=').click();
            cy.get('#total').should('have.text', '-10');
        })
    });

    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        cy.get('.digit').contains('4').click();
        cy.get('.operation').contains('X').click();
        cy.get('.digit').contains('2').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '8');
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        cy.get('.digit').contains('4').click();
        cy.get('.operation').contains('/').click();
        cy.get('.digit').contains('2').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '2');
    });

    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        cy.get('.digit').contains('1').click();
        cy.get('.modifier').contains('AC').click();
        cy.get('#total').should('have.text', '0');
    })

    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('3').click();
        cy.get('.digit').contains('4').click();
        cy.get('#total').should('have.text', '123');
    });

    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('0').click();
        cy.get('.operation').contains('/').click();
        cy.get('.digit').contains('3').click();
        cy.get('.operation').contains('=').click();
        cy.get('#total').should('have.text', '3');
    });
})