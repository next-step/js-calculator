const clickButton = (selector, text) => cy.contains(selector, text).click();

describe("계산기 테스트", () => {
	it("22 + 3 = 25", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "2");
		clickButton(".digit", "2");
		clickButton(".operation", "+");
		clickButton(".digit", "3");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "25");
	});

	it("100 - 1 = 99", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "1");
		clickButton(".digit", "0");
		clickButton(".digit", "0");
		clickButton(".operation", "-");
		clickButton(".digit", "1");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "99");
	});

	it("0 * 7 = 0", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "0");
		clickButton(".operation", "X");
		clickButton(".digit", "7");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "0");
	});
	it("85 / 8 = 10", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "8");
		clickButton(".digit", "5");
		clickButton(".operation", "/");
		clickButton(".digit", "8");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "10");
	});
});
