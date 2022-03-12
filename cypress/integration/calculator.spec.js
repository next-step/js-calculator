describe('Calculator test', () => {
  
  const range = (...args) => {
    const { length } = args
    
    if (length === 0 || length > 2) throw new Error('인자값은 반드시 한개 또는 두개 입니다.')
    
  
    if (length === 1 && typeof args[0] === 'number') {
      const stack = []
      for (let i = 0; i < args[0]; i++) {
        stack.push(i)
      }      
      return stack
    }
  
    if (length === 2 && (typeof args[0] === 'number' && typeof args[1] === 'number')) {
      
      const stack = []
      const [start, end] = [args[0], args[1]]
      for (let i = start; i < end; i++) {
        stack.push(i)
      }
      return stack
    }
  }


  beforeEach(() => {
    cy.visit('/')
  })

  it('초기 계산기 값은 0이다.', () => {
    cy.get('#total').should('contain.text', '0')
  })

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    const [first, second] = [range(10)[Math.floor(Math.random() * 10)], range(10)[Math.floor(Math.random() * 10)]]
    
    cy.get('.digit').contains(`${first}`).click()
    cy.get('.operation').contains('+').click()
    cy.get('.digit').contains(`${second}`).click()
    cy.get('.operation').contains('=').click()
    cy.get('#total').should('contain.text', `${Number(first) + Number(second)}`)
  })  

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    const [first, second] = [range(10)[Math.floor(Math.random() * 10)], range(10)[Math.floor(Math.random() * 10)]]
    
    cy.get('.digit').contains(`${first}`).click()
    cy.get('.operation').contains('-').click()
    cy.get('.digit').contains(`${second}`).click()
    cy.get('.operation').contains('=').click()
    cy.get('#total').should('contain.text', `${Number(first) - Number(second)}`)
  })  

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    const [first, second] = [range(10)[Math.floor(Math.random() * 10)], range(10)[Math.floor(Math.random() * 10)]]
    
    cy.get('.digit').contains(`${first}`).click()
    cy.get('.operation').contains('X').click()
    cy.get('.digit').contains(`${second}`).click()
    cy.get('.operation').contains('=').click()
    cy.get('#total').should('contain.text', `${Number(first) * Number(second)}`)
  })  

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.get('.digit').contains('6').click()
    cy.get('.operation').contains('/').click()
    cy.get('.digit').contains('3').click()
    cy.get('.operation').contains('=').click()
    cy.get('#total').should('contain.text', '2')
  })  

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const randomNumber = range(10)[Math.floor(Math.random() * 10)]
    
    cy.get('.digit').contains(`${randomNumber}`).click()
    cy.get('.modifier').click()
    cy.get('#total').should('contain.text', '0')
  })  

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const randomNumber = range(10)[Math.floor(Math.random() * 10)]
    for (let i = 0; i < 4; i++) {
      cy.get('.digit').contains(`${randomNumber}`).click()
    }
    cy.get('#total').should((value) => {
      expect(value).to.have.text( String(randomNumber).repeat(3))
    })
  })  

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const [first, second] = [range(10)[Math.floor(Math.random() * 10)], range(10)[Math.floor(Math.random() * 10)]]
    
    cy.get('.digit').contains(`${first}`).click()
    cy.get('.operation').contains('/').click()
    cy.get('.digit').contains(`${second}`).click()
    cy.get('.operation').contains('=').click()
    cy.get('#total').should('contain.text', Math.floor(Number(first) / Number(second)))
  })
})