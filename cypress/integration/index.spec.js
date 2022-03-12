/// <reference types="cypress" />


describe("계산기 테스트", () => {
    const handleClickNumber = number => cy.get(`button:contains("${number}")`).click()
    const handleClickNumbers = (...numbers) => numbers.map(number => handleClickNumber(number))
    const handleClickMinus = () => cy.get(`button:contains("-")`).click()
    const handleClickPlus = () => cy.get(`button:contains("+")`).click()
    const handleClickMultiply = () => cy.get(`button:contains("X")`).click()
    const handleClickDivide = () => cy.get(`button:contains("/")`).click()
    const handleClickEqual = () => cy.get(`button:contains("=")`).click()
    const handleClickClear = () => cy.get(`button:contains("AC")`).click()
    const totalShouldBe = (result) => cy.get(`#total`).should('have.text', result)

    beforeEach(() => {
        cy.visit('http://localhost:5000/');
    });
    afterEach(() =>{
        handleClickClear()
    })

    it('계산기가 존재한다.', () => {
        cy.get('.calculator').should('exist')
    });
    it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
        handleClickNumber(1);
        handleClickPlus()
        handleClickNumber(2)
        handleClickEqual()
        totalShouldBe('3')
    })
    it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
        handleClickNumber(2)
        handleClickMinus()
        handleClickNumber(1)
        handleClickEqual()
        totalShouldBe('1')
    })
    it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
        handleClickNumber(2)
        handleClickMultiply()
        handleClickNumber(3)
        handleClickEqual()
        totalShouldBe('6')
    })
    it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
        handleClickNumber(4)
        handleClickDivide()
        handleClickNumber(2)
        handleClickEqual()
        totalShouldBe('2')
    })
    it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
        handleClickNumber(2)
        handleClickMinus()
        handleClickNumber(1)
        handleClickClear()
        totalShouldBe('0')
    })
    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
        const stub = cy.stub()

        cy.on('window:alert', stub)
        handleClickNumbers(2, 2, 2)
        handleClickNumber(2).then(() => {
            expect(stub.getCall(0)).to.be.calledWith('숫자는 3자리까지만 입력할 수 있습니다.')
        })
    })
    it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
        handleClickNumbers(1, 0)
        handleClickDivide()
        handleClickNumber(3)
        handleClickEqual()
        totalShouldBe('3')
    })
});
