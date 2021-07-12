describe('My Calculator Test', () => {
  beforeEach(()=>{
    cy.visit('http://192.168.56.1:5500/index.html');
  })
  
  it('두 개의 숫자를 더한다', () => {
    cy.get('.digit6').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit3').click();

    cy.contains('=').click();

    cy.get('#total').should('have.text', 9);

  })

  it('두 개의 숫자를 뺀다', () => {
    cy.get('.digit1').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit3').click();

    cy.contains('=').click();
    cy.get('#total').should('have.text', -2);
  })

  it('두 개의 숫자를 곱한다', () => {
    cy.get('.digit5').click();
    cy.get('.operation').contains('X').click();
    cy.get('.digit7').click();

    cy.contains('=').click();
    cy.get('#total').should('have.text', 35);
  })

  it('두 개의 숫자를 나눈다', () => {
    cy.get('.digit9').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit3').click();

    cy.contains('=').click();
    cy.get('#total').should('have.text', 3);
  })

  it('AC버튼읗 누르면 디스플레이 값이 0으로 초기화 된다', () => {
    cy.get('.modifier').click();
    
    cy.contains('=').click();
    cy.get('#total').should('have.text', 0);
  })

  it('숫자는 연속해서 최대 3자리 수까지만 입력가능하다 ', () => {
    cy.get('.digit1').click();
    cy.get('.digit2').click();
    cy.get('.digit3').click();
    cy.get('.digit4').click();

    cy.on('window: alert', (txt) => {
      expect(txt).to.contains('숫자는 세 자리까지만 입력 가능합니다!')
    })
    cy.get('#total').should('have.text', 123);
  })

  it('계산 결과가 음수가 나왔을 때 "-" 연산자를 입력후 숫자를 입력해도 최대  3자리 수까지만 입력 가능하다', () => {
    cy.get('.digit3').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit9').click();
    cy.contains('=').click();

    cy.get('.operation').contains('-').click();
    
    cy.get('.digit4').click();
    cy.get('.digit5').click();
    cy.get('.digit6').click();
    cy.get('.digit9').click();

    cy.on('window: alert', (txt) => {
      expect(txt).to.contains('숫자는 세 자리까지만 입력 가능합니다!')
    })
    cy.get('#total').should('have.text', '-6-456');
  })
  
  it('계산 결과를 표현할 때 소수점이하는 버린다.', () => {
    cy.get('.digit1').click();
    cy.get('.operation').get('.digit2').click();
    cy.contains('/').click();
    cy.get('.digit5').click();

    cy.contains('=').click();
    cy.get('#total').should('have.text', 2);
  })
})
