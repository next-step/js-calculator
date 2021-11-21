// 2개의 숫자에 대해 덧셈이 가능하다.
// 2개의 숫자에 대해 뺄셈이 가능하다.
// 2개의 숫자에 대해 곱셈이 가능하다.
// 2개의 숫자에 대해 나눗셈이 가능하다.
// AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// 계산 결과를 표현할 때 소수점 이하는 버림한다.

describe('test', () => {
    context('계산기', () => {
        it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const ranDigit1 = parseInt(Math.random() * 10);
            const ranDigit2 = parseInt(Math.random() * 10);
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.operation').contains("+").click()
                .get('button.digit').contains(ranDigit2).click()
                .get('button.operation').contains("=").click()
                .get("#app").should('have.data', 'storedDigit', ranDigit1 + ranDigit2);

        });
        it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const ranDigit1 = parseInt(Math.random() * 10);
            const ranDigit2 = parseInt(Math.random() * 10);
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1.toString()).click()
                .get('button.operation').contains("-").click()
                .get('button.digit').contains(ranDigit2.toString()).click()
                .get('button.operation').contains("=").click()
                .get("#app").should('have.data', 'storedDigit', ranDigit1 - ranDigit2);
        });
        it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const ranDigit1 = parseInt(Math.random() * 10);
            const ranDigit2 = parseInt(Math.random() * 10);
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.operation').contains("X").click()
                .get('button.digit').contains(ranDigit2).click()
                .get('button.operation').contains("=").click()
                .get("#app").should('have.data', 'storedDigit', ranDigit1 * ranDigit2);
        });
        it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const ranDigit1 = parseInt(Math.random() * 10);
            const ranDigit2 = parseInt(Math.random() * 10);
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.operation').contains("/").click()
                .get('button.digit').contains(ranDigit2).click()
                .get('button.operation').contains("=").click()
                .get("#app").should('have.data', 'storedDigit', ranDigit1 / ranDigit2);
        });
        it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const ranDigit1 = parseInt(Math.random() * 10);
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.modifier').contains("AC").click()
                .get("#total").contains(0);
        });
        it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            const [ranDigit1, ranDigit2, ranDigit3, ranDigit4] = parseInt(((Math.random() * 1000) + 1000)).toString().split("");
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.digit').contains(ranDigit2).click()
                .get('button.digit').contains(ranDigit3).click()
                .get('button.digit').contains(ranDigit4).click()
                .get("#total").contains(`${ranDigit1}${ranDigit2}${ranDigit3}`);
        });
        it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
            const visit = cy.visit('http://127.0.0.1:8080/');
            let ranDigit1 = 0;
            let ranDigit2 = 0;
            do {
                ranDigit1 = parseInt(Math.random() * 10);
                ranDigit2 = parseInt(Math.random() * 10);
            } while (!Number.isInteger(ranDigit1 / ranDigit2));
            visit.get('button.digit')
                .get('button.digit').contains(ranDigit1).click()
                .get('button.operation').contains("/").click()
                .get('button.digit').contains(ranDigit2).click()
                .get('button.operation').contains("=").click()
                .get("#total").contains(Math.floor(ranDigit1 / ranDigit2).toString());
        });
    });
});
