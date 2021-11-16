describe("calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  it("숫자를 눌렀을 때 디스플레이에 숫자가 표시된다", () => {
    cy.get("#total").then(() => {
      cy.get(".digits").contains("1").click();
      cy.get("#total").should("have.text", "1");
    });
  });

  it("세 자리를 넘어 숫자가 입력되면 alert창이 표시된다", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#total").then(() => {
      for (let i = 0; i < 3; i++) {
        cy.get(".digits").contains("1").click();
      }
      cy.get(".digits")
        .contains("1")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "3자리 수까지 입력 가능합니다."
          );
        });
    });

    cy.get("#total").should("have.text", "111");
  });

  it("덧셈 테스트: 1, +, 2를 입력하면 3이 표시된다", () => {
    cy.get("#total").then(() => {
      cy.get(".digits").contains("1").click();
      cy.get(".operations").contains("+").click();
      cy.get(".digits").contains("2").click();
      cy.get(".operations").contains("=").click();
      cy.get("#total").should("have.text", "3");
    });
  });

  it("뺄셈 테스트: 3, -, 4를 입력하면 -1이 표시된다", () => {
    cy.get("#total").then(() => {
      cy.get(".digits").contains("3").click();
      cy.get(".operations").contains("-").click();
      cy.get(".digits").contains("4").click();
      cy.get(".operations").contains("=").click();
      cy.get("#total").should("have.text", "-1");
    });
  });

  it("곱셈 테스트: 5, X, 6을 입력하면 30이 표시된다", () => {
    cy.get("#total").then(() => {
      cy.get(".digits").contains("5").click();
      cy.get(".operations").contains("X").click();
      cy.get(".digits").contains("6").click();
      cy.get(".operations").contains("=").click();
      cy.get("#total").should("have.text", "30");
    });
  });

  it("나눗셈 테스트: 80, /, 6을 입력하면 13이 표시된다", () => {
    cy.get("#total").then(() => {
      cy.get(".digits").contains("8").click();
      cy.get(".digits").contains("0").click();

      cy.get(".operations").contains("/").click();
      cy.get(".digits").contains("6").click();
      cy.get(".operations").contains("=").click();
      cy.get("#total").should("have.text", "13");
    });
  });

  it("AC 클릭시 디스플레이 값이 0으로 초기화된다.", () => {
    cy.get(".digits").contains("1").click();
    cy.get(".digits").contains("1").click();
    cy.get(".modifier").click();

    cy.get("#total").should("have.text", "0");
  });
});
