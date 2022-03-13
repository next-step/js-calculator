describe('js-calculator basic test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('두 피연산자에 대해 덧셈이 가능한가?', () => {
        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-plus]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-cal]').click();
        cy.get('[data-cy=total]').should('have.text', '7');
    });

    it('두 피연산자에 대해 뺄셈이 가능한가?', () => {
        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-sub]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-cal]').click();
        cy.get('[data-cy=total]').should('have.text', '3');
    });

    it('두 피연산자에 대해 나눗셈이 가능한가?', () => {
        cy.get('[data-cy=btn-digit-4]').click();
        cy.get('[data-cy=btn-oper-div]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-cal]').click();
        cy.get('[data-cy=total]').should('have.text', '2');
    });

    it('두 피연산자에 대해 곱셈이 가능한가?', () => {
        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-mul]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-cal]').click();
        cy.get('[data-cy=total]').should('have.text', '10');
    });

    it('AC 버튼을 눌러 0으로 초기화가 가능한가?', () => {
        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-mul]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-modifier]').click();
        cy.get('[data-cy=total]').should('have.text', '0');
    });

    it('숫자는 한번에 최대 3자리 수까지 입력 가능한가?', () => {
        const alertStub = cy.stub();

        cy.on('window:alert', alertStub);

        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-digit-4]').click();
        cy.get('[data-cy=btn-digit-3]').click();
        cy.get('[data-cy=btn-digit-2]')
            .click()
            .then(() => {
                expect(alertStub.getCall(0)).to.be.calledWith(
                    '숫자는 세 자리까지만 입력 가능합니다!'
                );
            });

        cy.get('[data-cy=total]').should('have.text', '543');
    });

    it('계산 결과를 표현할 때 소수점 이하는 버려지는가?', () => {
        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-div]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-cal]').click();
        cy.get('[data-cy=total]').should('have.text', '2');
    });

    it('2개의 피연산자 조합으로만 계산이 가능한가?', () => {
        const alertStub = cy.stub();

        cy.on('window:alert', alertStub);

        cy.get('[data-cy=btn-digit-5]').click();
        cy.get('[data-cy=btn-oper-plus]').click();
        cy.get('[data-cy=btn-digit-2]').click();
        cy.get('[data-cy=btn-oper-mul]')
            .click()
            .then(() => {
                expect(alertStub.getCall(0)).to.be.calledWith(
                    '2개의 숫자 조합만 계산 가능합니다!'
                );
            });

        cy.get('[data-cy=total]').should('have.text', '5+2');
    });

    it('피연산자 입력 전에 연산자 입력이 가능한가?', () => {
        const alertStub = cy.stub();

        cy.on('window:alert', alertStub);

        cy.get('[data-cy=btn-oper-mul]')
            .click()
            .then(() => {
                expect(alertStub.getCall(0)).to.be.calledWith(
                    '숫자를 먼저 입력한 후 연산자를 입력해주세요!'
                );
            });

        cy.get('[data-cy=total]').should('have.text', '0');
    });
});
