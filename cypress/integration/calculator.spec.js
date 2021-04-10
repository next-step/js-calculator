describe("calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
    it(`숫자 ${number} 버튼 클릭 시 상단의 번호 바뀜`, () => {
      cy.get(".digit").contains(number).click();

      cy.get("#total").should("have.text", number);
    });
  });

  it("숫자 클릭 이후 다시 숫자 입력 시 덮어씌워지지 않고 뒤에 추가", () => {
    const before = "1";
    const after = "2";

    cy.get(".digit").contains(before).click();
    cy.get(".digit").contains(after).click();

    cy.get("#total").should("have.text", before + after);
  });

  it("AC 버튼 클릭 시 0으로 복귀", () => {
    cy.get(".digit").contains(1).click();

    cy.get(".modifier").click();

    cy.get("#total").should("have.text", 0);
  });

  ["+", "-", "X", "/", "="].forEach((operator) => {
    it(`숫자 클릭 후 ${operator} 클릭 시 다음 숫자는 추가되지 않고 덮어씌움`, () => {
      cy.get(".digit").contains(1).click();

      cy.get(".operation").contains(operator).click();
      cy.get(".digit").contains(3).click();

      cy.get("#total").should("have.text", 3);
    });
  });

  it("연산자 클릭 후 두번째는 덮어씌워지지 않고 추가", () => {
    cy.get(".digit").contains(1).click();
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains(3).click();
    cy.get("#total").should("have.text", 3);

    cy.get(".digit").contains(4).click();

    cy.get("#total").should("have.text", 34);
  });
});
