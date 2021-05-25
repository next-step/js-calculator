describe('ui-calculator', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('연산 형식', () => {
        it('첫 입력은 숫자만 가능', () => {
            ['/', 'X', '-', '+', '='].forEach((operation) => {
                cy.get('.operation').contains(operation).click();

                cy.get('#total').should('have.text', 0);
            });
        });

        it('두개의 숫자만 연산 가능', () => {
            ['/', 'X', '-', '+'].forEach((operation) => {
                cy.get('.modifier').click();
                cy.get('.digit').contains(1).click();
                cy.get('.operation').contains('+').click();
                cy.get('.digit').contains(2).click();
                cy.get('.operation').contains(operation).click();

                cy.get('#total').should('have.text', '1+2');
            });
        });

        it('이전에 나온 결과값 사용하여 계속 연산', () => {});
    });

    describe('digit click', () => {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
            it(`${number} click -> 숫자 표시`, () => {
                cy.get('.digit').contains(number).click();
                cy.get('#total').should('have.text', number);
            });
        });

        it('숫자는 한번에 최대 3자리 수까지 입력 가능', () => {
            const digits = ['1', '2', '3', '4', '5', '6', '7'];
            digits.forEach((digit) => cy.get('.digit').contains(digit).click());
            cy.get('#total').should('have.text', digits.slice(0, 3).join(''));
        });
    });

    describe('AC click', () => {
        it('AC(All Clear) button -> 0으로 초기화', () => {
            const digits = [1, 2, 3];
            digits.forEach((digit) => cy.get('.digit').contains(digit).click());
            cy.get('.modifier').click();

            cy.get('#total').should('have.text', 0);
        });
    });

    describe('2개 숫자 연산', () => {
        it('덧셈', () => {
            const number1 = [6, 7];
            const nubmer2 = [3, 0];
            number1.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('+').click();
            nubmer2.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('=').click();

            cy.get('#total').should('have.text', 67 + 30);
        });
        it('뺄셈', () => {
            const number1 = [6, 7];
            const nubmer2 = [3, 0];
            number1.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('-').click();
            nubmer2.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('=').click();

            cy.get('#total').should('have.text', 67 - 30);
        });
        it('곱셈', () => {
            const number1 = [6, 7];
            const nubmer2 = [3, 0];
            number1.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('X').click();
            nubmer2.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('=').click();

            cy.get('#total').should('have.text', 67 * 30);
        });
        it('나눗셈', () => {
            const number1 = [6, 7];
            const nubmer2 = [3, 0];
            number1.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('/').click();
            nubmer2.forEach((x) => cy.get('.digit').contains(x).click());
            cy.get('.operation').contains('=').click();

            cy.get('#total').should('have.text', 2);
        });
    });
});
