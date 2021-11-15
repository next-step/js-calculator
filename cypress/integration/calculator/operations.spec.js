import {OPERATOR} from '../../../src/js/consts/operator.js';

describe('사칙 연산', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        cy.equalTotal(0);

        cy.clickDigit(7);
        cy.clickOperator(OPERATOR.PLUS);
        cy.clickDigit(3);
        cy.clickOperator(OPERATOR.EQUAL);

        cy.equalTotal(10);
    });

    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        cy.equalTotal(0);

        cy.clickDigit(7);
        cy.clickOperator(OPERATOR.MINUS);
        cy.clickDigit(3);
        cy.clickOperator(OPERATOR.EQUAL);

        cy.equalTotal(4);
    });

    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        cy.equalTotal(0);

        cy.clickDigit(7);
        cy.clickOperator(OPERATOR.MULTIPLE);
        cy.clickDigit(3);
        cy.clickOperator(OPERATOR.EQUAL);

        cy.equalTotal(21);
    });

    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        cy.equalTotal(0);

        cy.clickDigit(6);
        cy.clickOperator(OPERATOR.DIVIDE);
        cy.clickDigit(3);
        cy.clickOperator(OPERATOR.EQUAL);

        cy.equalTotal(2);
    });

    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        //given
        cy.equalTotal(0);

        cy.clickDigit(6);
        cy.equalTotal(6);

        //when
        cy.clickModifier();

        //then
        cy.equalTotal(0);

        //given
        cy.clickDigit(6);
        cy.clickOperator(OPERATOR.DIVIDE);

        //when
        cy.clickModifier();

        //then
        cy.equalTotal(0);
    });

    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        cy.equalTotal(0);

        cy.clickDigit(7);
        cy.clickOperator(OPERATOR.DIVIDE);
        cy.clickDigit(3);
        cy.clickOperator(OPERATOR.EQUAL);

        cy.equalTotal(2);
    });
});
