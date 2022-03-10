/// <reference types="cypress" />
describe("계산기 테스트", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/');
    });

    it('계산기가 존재한다.', () => {
        cy.get('.calculator').should('exist')
    });
    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        cy.get('button:contains("1")').click()
        cy.get('button:contains("+")').click()
        cy.get('button:contains("2")').click()
        cy.get('button:contains("=")').click()
        cy.get('#total').should('have.text', '3')
    })
    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        cy.get('button:contains("2")').click()
        cy.get('button:contains("-")').click()
        cy.get('button:contains("1")').click()
        cy.get('button:contains("=")').click()
        cy.get('#total').should('have.text', '1')
    })
    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        cy.get('button:contains("2")').click()
        cy.get('button:contains("X")').click()
        cy.get('button:contains("3")').click()
        cy.get('button:contains("=")').click()
        cy.get('#total').should('have.text', '6')
    })
    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        cy.get('button:contains("4")').click()
        cy.get('button:contains("/")').click()
        cy.get('button:contains("2")').click()
        cy.get('button:contains("=")').click()
        cy.get('#total').should('have.text', '2')
    })
    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        cy.get('button:contains("2")').click()
        cy.get('button:contains("-")').click()
        cy.get('button:contains("1")').click()
        cy.get('button:contains("AC")').click()
        cy.get('#total').should('have.text', '0')
    })
    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
        const stub = cy.stub()

        cy.on('window:alert', stub)
        cy.get('button:contains("2")').click()
        cy.get('button:contains("2")').click()
        cy.get('button:contains("2")').click()
        cy.get('button:contains("2")').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('숫자는 3자리까지만 입력할 수 있습니다.')
            })
    })
    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        cy.get('button:contains("1")').click()
        cy.get('button:contains("0")').click()
        cy.get('button:contains("/")').click()
        cy.get('button:contains("3")').click()
        cy.get('button:contains("=")').click()
        cy.get('#total').should('have.text', '3')
    })
});
