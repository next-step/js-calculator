/// <reference types="cypress" />

describe('계산기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('시작 테스', () => {
    expect(true).is.eq(true)
    assert(true, '테스트 확인')
  })
})
