describe("계산기 테스트", () => {
	it("2 + 3 = 5", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		cy.contains(".digit", "2").click();
		cy.contains(".operation", "+").click();
		cy.contains(".digit", "3").click();
		cy.contains(".operation", "=").click();

		cy.get("#total").should("have.text", "5");
	});
});
