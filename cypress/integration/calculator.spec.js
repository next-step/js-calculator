import { ERROR_MESSEAGE, RESTRICTIONS } from "../../src/constants";

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    const test = "123+456=";
    const result = 123+456;

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });

    cy.get("#total").should("have.text", result);
  })
  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    const test = "123-456=";
    const result = 123-456;

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });

    cy.get("#total").should("have.text", result);
  })
  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    const test = "123X456=";
    const result = 123*456;

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });

    cy.get("#total").should("have.text", result);
  })
  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    const test = "500/5=";
    const result = 500/5;

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });

    cy.get("#total").should("have.text", result);
  })
  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    const test = "555";
    const AC = "AC";
    const result = RESTRICTIONS.INITAL_VALUE;

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });
    cy.contains("button", AC).click();

    cy.get("#total").should("have.text", result);

  })
  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const test = "123";
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    [...test].forEach((s) => {
      cy.contains("button", s).click();
    });

    cy.contains("button", "4").click().then(() => {
        cy.on("window:alert", (txt) => {
            expect(txt).to.equal(ERROR_MESSEAGE.INVAILD_DIGIT_LENGTH)
        })
    })
  })
  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const test = "5/2=";
    const result = Math.floor(5/2);

    [...test].forEach(elm => {
        cy.contains("button", elm).click();
    });

    cy.get("#total").should("have.text", result);
  })
});
