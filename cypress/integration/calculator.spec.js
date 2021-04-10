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
});
