describe('four-rule-calculations', () => {

  const operandData1 = Array.from({length: 9}, (_, i) => i + 1) // 1~9 숫자
  const operandData2 = [...Array(10).keys()] //0~9 숫자
  const operator = ['+', '-', '/', 'X']
  const operators = {
    '+': (op1, op2) => op1 + op2,
    '-': (op1, op2) => op1 - op2,
    'X': (op1, op2) => op1 * op2, 
    '/': (op1, op2) => Math.floor(op1 / op2)
  };

  beforeEach(() => {
    cy.visit('http://localhost:5501')
  })

  
  // 모든 한자리수 계산값을 구하는 과정이오니, 혹시 실행시켜보시는 분이 계신다면 주석처리 권장
  operandData1.forEach(n1 => {
    operandData2.forEach(n2 => {
      operator.forEach(op => { 
        it('한자리 숫자 두 개의 사칙연산', () => {
          if (n2 === 0 && op == '/') {
            return;
          }
          cy.get(`[data-cy=${n1}]`).click()
          cy.get(`[data-cy='${op}']`).click()
          cy.get(`[data-cy=${n2}]`).click()
          cy.get(`[data-cy='=']`).click()
          cy.get('#total').should(($total) => {
            expect(parseInt($total.get(0).innerText)).to.eq(operators[op](n1, n2))
          })
        })
      }) 
    })
  })

  it('두 자리수 더하기', () => {
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy=5]`).click()
    cy.get(`[data-cy='+']`).click()
    cy.get(`[data-cy=1]`).click()
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy='=']`).click()
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(37)
    })
  })

  it('두 자리수 빼기', () => {
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy=5]`).click()
    cy.get(`[data-cy='-']`).click()
    cy.get(`[data-cy=1]`).click()
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy='=']`).click()
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(13)
    })
  })

  it('두 자리수 나누기', () => {
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy=5]`).click()
    cy.get(`[data-cy='/']`).click()
    cy.get(`[data-cy=1]`).click()
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy='=']`).click()
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(2)
    })
  })

  it('두 자리수 곱하기', () => {
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy=5]`).click()
    cy.get(`[data-cy='X']`).click()
    cy.get(`[data-cy=1]`).click()
    cy.get(`[data-cy=2]`).click()
    cy.get(`[data-cy='=']`).click()
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(300)
    })
  })


  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.get(`[data-cy=1]`).click()
    cy.get(`[data-cy='/']`).click()
    cy.get(`[data-cy=3]`).click()
    cy.get(`[data-cy='=']`).click()
    cy.get('#total').should(($total) => {
      expect(parseInt($total.get(0).innerText)).to.eq(0)
    })
  })


})