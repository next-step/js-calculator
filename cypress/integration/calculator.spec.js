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
});
