/// <reference types="cypress" />

describe('계산기 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('#total').contains(/^0$/gim)
  })

  it('숫자를 누르면 h1#total에 들어간다.', () => {
    cy.inputRepeatNumber()
    cy.get('#total').contains(/[0-9]+/gim)
  })

  it('초기값 숫자가 0인 경우 0을 계속 눌러도 0으로 표시한다.', () => {
    cy.inputRepeatNumber(10, 0)
    cy.get('#total').contains(/^0$/gim)
  })

  it('초기값 숫자가 0인 경우 0이 아닌 숫자를 누르면 제일 앞에 0을 지우고 변경하기', () => {
    cy.inputIgnoreTargetNumber(0)
    cy.get('#total').contains(/^[1-9]$/gim)
  })

  it('앞에 숫자가 하나 있고 /X-+연산자 버튼을 누르면 연산자가 표시 되게. =연산자 제외', () => {
    cy.inputRepeatNumber()
    cy.inputIgnoreTargetOperator('=')
    cy.get('#total').contains(/^-?[0-9]+[+/X-]$/gim)
  })

  it('= 연산자를 경우 표시하지 않는다', () => {
    cy.inputRandomNumericalExpression('+')

    cy.get('.operation:nth-child(5)').click()
    cy.get('#total').should('not.contain.text', '=')
  })

  it('연산자 연속으로 오는 경우 경고창', () => {
    cy.inputRepeatNumber(3)
    cy.inputIgnoreTargetOperator('=')
    cy.inputIgnoreTargetOperator('=')
    cy.inputIgnoreTargetOperator('=')

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`연산자는 연속해서 입력 불가`)
    })
  })

  it('연산자는 젤 앞에 음수 기호 빼고 한개', () => {
    cy.inputRepeatNumber()
    cy.inputIgnoreTargetOperator('=')
    cy.inputIgnoreTargetOperator('=')
    cy.inputRepeatNumber()
    cy.inputIgnoreTargetOperator('=')
    cy.inputIgnoreTargetOperator('=')
    cy.inputRepeatNumber()
    cy.inputIgnoreTargetOperator('=')
    cy.inputIgnoreTargetOperator('=')

    cy.get('#total')
      .invoke('text')
      .then((text) => {
        const operList = text.match(/[0-9]+[+/X-]/gim)
        expect(Array.isArray(operList) && operList.length > 1).equal(false)
      })
  })

  it('앞의 숫자가 음수일때 계산 가능 여부 확인', () => {
    cy.inputRepeatNumber(4, 3)
    cy.inputOperator('-')
    cy.inputRepeatNumber(4, 4)
    cy.inputOperator('=')

    // -111 에 랜던함 연산 수행
    cy.inputIgnoreTargetOperator('=')
    cy.inputRepeatNumber()

    cy.calculateNumericalExpression()
  })

  it('수식이 완성하지 않고 =연산자 누르면 경고', () => {
    cy.inputRepeatNumber(3)
    cy.inputOperator('=')

    cy.get('#total').should('not.contain.text', '=')

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`올바른 수식 입력`)
    })
  })

  it('두번째 숫자가 0이 먼저 오는 경우 표시', () => {
    cy.inputRepeatNumber(3)

    // 000
    cy.inputIgnoreTargetOperator('=')
    cy.inputRepeatNumber(3, 0)

    // 000 ~ 009
    // cy.inputNumber(0)
    // cy.inputNumber(0)
    // cy.inputNumber()

    // 010 ~ 099
    // cy.inputNumber(0)
    // cy.inputNumber()
    // cy.inputNumber()

    cy.get('#total')
      .invoke('text')
      .then((text) => {
        expect(text.match(/0?[0-9][0-9]$/gim))
      })
  })

  it.only('0/0 인 경우 NaN 처리 - 팝업, 이전값으로 되돌리기?', () => {
    cy.inputNumber(0)
    cy.inputOperator('/')
    cy.inputNumber(0)
    cy.inputOperator('=')

    cy.get('#total').contains(/NaN/gim)
  })
})

describe('계산기 기능 요구사항 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('#total').contains(/^0$/gim)
  })

  it('2개의 숫자에 대해 덧셈이 가능.', () => {
    cy.inputRandomNumericalExpression('+')
    cy.calculateNumericalExpression()
  })

  it('2개의 숫자에 대해 뺄셈이 가능.', () => {
    cy.inputRandomNumericalExpression('-')
    cy.calculateNumericalExpression()
  })

  it('2개의 숫자에 대해 곱셈이 가능.', () => {
    cy.inputRandomNumericalExpression('X')
    cy.calculateNumericalExpression()
  })

  it('2개의 숫자에 대해 나눗셈이 가능.', () => {
    cy.inputRandomNumericalExpression('/', 4)
    cy.calculateNumericalExpression()
  })

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.inputRandomNumericalExpression()

    cy.contains('AC').click()
    cy.get('#total').invoke('text').should('equal', '0')
  })

  it('숫자는 한번에 최대 3자리 수까지 입력 가능', () => {
    cy.inputRepeatNumber()

    cy.get('#total')
      .invoke('text')
      .then((text) => {
        expect(text.length).lte(3)
      })
  })

  it('계산 결과 소수점 이하 버림', () => {
    cy.inputRandomNumericalExpression('/')
    cy.inputOperator('=')

    cy.get('#total').should('not.contain.text', '.')
  })
})
