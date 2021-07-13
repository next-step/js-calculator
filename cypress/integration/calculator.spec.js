context("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  describe("Calculation", () => {
    it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
      let lValue = "",
        rValue = "";
      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            lValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("+")) $operation.trigger("click");
      });

      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            rValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("=")) $operation.trigger("click");
      });

      cy.get("#total").then(($total) => {
        expect(Number($total.text())).to.equal(Number(lValue) + Number(rValue));
      });
    });

    it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
      let lValue = "",
        rValue = "";
      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            lValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("-")) $operation.trigger("click");
      });

      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            rValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("=")) $operation.trigger("click");
      });

      cy.get("#total").then(($total) => {
        expect(Number($total.text())).to.equal(Number(lValue) - Number(rValue));
      });
    });

    it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
      let lValue = "",
        rValue = "";
      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            lValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("X")) $operation.trigger("click");
      });

      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            rValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("=")) $operation.trigger("click");
      });

      cy.get("#total").then(($total) => {
        expect(Number($total.text())).to.equal(Number(lValue) * Number(rValue));
      });
    });

    it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
      let lValue = "",
        rValue = "";
      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            lValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("/")) $operation.trigger("click");
      });

      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            rValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("=")) $operation.trigger("click");
      });

      cy.get("#total").then(($total) => {
        expect(Number($total.text())).to.equal(
          Math.floor(Number(lValue) / Number(rValue))
        );
      });
    });
  });

  describe("Other Function", () => {
    it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
      let ac = cy.get(".modifier").contains("AC");

      ac.click();

      cy.get("#total").then(($total) => {
        expect($total.text()).to.contain(0);
      });
    });

    it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
      for (let i = 0; i < 4; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .click();
      }

      cy.get("#total").should(($total) =>
        expect($total.text()).to.have.length(3)
      );
    });

    it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
      let lValue = "",
        rValue = "";
      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            lValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("/")) $operation.trigger("click");
      });

      for (let i = 0; i < 3; i++) {
        cy.get(".digits")
          .children()
          .eq(Math.floor(Math.random() * 10))
          .then(($number) => {
            $number.trigger("click");
            rValue += $number.text();
          });
      }

      cy.get(".operation").each(($operation) => {
        if ($operation.text().includes("=")) $operation.trigger("click");
      });

      cy.get("#total").then(($total) => {
        const result = Number($total.text());
        expect(Number.isInteger(result)).to.equal(true);
      });
    });
  });
});
