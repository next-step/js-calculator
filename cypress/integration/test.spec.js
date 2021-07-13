import { createTwoRandomNumber, autoClick } from "./util"
import { ERROR_TEXT } from "../../src/js/constants"

describe("계산기 테스트", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const [a, b] = createTwoRandomNumber()
    autoClick([a, "+", b, "="])

    cy.get("#total").should("have.text", a + b)
  })

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const [a, b] = createTwoRandomNumber()
    autoClick([a, "-", b, "="])

    cy.get("#total").should("have.text", a - b)
  })

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const [a, b] = createTwoRandomNumber()
    autoClick([a, "X", b, "="])

    cy.get("#total").should("have.text", a * b)
  })

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const [a, b] = createTwoRandomNumber()
    autoClick([a, "/", b, "="])

    cy.get("#total").should("have.text", Math.floor(a / b))
    cy.get("#total").should("have.not", Math.floor(a / b))
  })

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    autoClick([123])

    cy.get(".modifier").click()
    cy.get("#total").should("have.text", 0)
  })

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.(alert 작동 확인)", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERROR_TEXT.DIGIT_LENGTH)
    })
    autoClick([1234])
  })

  it("연산자는 숫자 다음에만 올 수 있다.", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERROR_TEXT.OPERATION_INVALID_LOCATION)
    })
    autoClick([123, "/", "X"])
  })

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    autoClick([100, "/", 101, "="])
    cy.get("#total").should("have.text", 0)
  })
})
