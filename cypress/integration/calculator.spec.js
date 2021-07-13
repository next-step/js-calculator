describe("calculator", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5500/");
    });
    const clickNumber = (number = 999) => {
      String(number)
        .split("")
        .map((num) => cy.get(".digits").contains(num).click());
    };
    
    it("2개의 숫자에 대해 덧셈이 가능해야 한다.", () => {
        clickNumber(999);
        cy.contains('+').click();
        clickNumber(999);
        cy.contains("=").click();

        cy.get("#total").should("have.text", "1998");
    });

    it("2개의 숫자에 대해 뺄셈이 가능해야 한다.", () => {
        clickNumber(999);
        cy.contains('-').click();
        clickNumber(999);
        cy.contains("=").click();

        cy.get("#total").should("have.text", "0");
    });

    it("2개의 숫자에 대해 곱셈이 가능해야 한다.", () => {
        clickNumber(999);
        cy.contains('X').click();
        clickNumber(999);
        cy.contains("=").click();

        cy.get("#total").should("have.text", "998001");
    });

    it("나눗셈을 할 때 소수점 이하는 버려야 한다.", () => {
        clickNumber(999);
        cy.contains('/').click();
        clickNumber(8);
        cy.contains("=").click();

        cy.get("#total").should("have.text", Math.floor(999 / 8));
    });

    
    it('"AC" 버튼을 클릭했을 때 결과화면이 0으로 초기화 되어야 한다.', () => {
        clickNumber(999);
        cy.contains("AC").click();

        cy.get("#total").should("have.text", '0');
    });

    it("숫자는 한번에 최대 3자리 수까지 입력이 가능하다.", () => {
        clickNumber(9);
        clickNumber(9);
        clickNumber(9);
        clickNumber(9);
        cy.get("#total").should("have.text", "999");
    });

    it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
        clickNumber(999);
        cy.contains('/').click();
        clickNumber(8);
        cy.contains("=").click();
        cy.get("#total").should("have.text", "124");
    });
});
  