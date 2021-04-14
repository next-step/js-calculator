describe('validation-test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5501')
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
  
    cy.get(`[data-cy=3]`).click() 
    cy.get(`[data-cy=4]`).click() 
    cy.get(`[data-cy=5]`).click() 
    cy.get(`[data-cy=6]`)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("숫자는 세 자리까지만 입력 가능합니다!")
        }) 
    
  })

  it('피연산자 숫자 없이 연산자를 입력할 수 없다.', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get(`[data-cy='+']`)
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("숫자를 먼저 입력한 후 연산자를 입력해주세요!")
        })
  })
  
})