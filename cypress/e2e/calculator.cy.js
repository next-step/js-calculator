const clickButton = (selector, text) => cy.contains(selector, text).click();

describe("사칙연산 테스트", () => {
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
	it("847 / 7 = 121", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "8");
		clickButton(".digit", "4");
		clickButton(".digit", "7");
		clickButton(".operation", "/");
		clickButton(".digit", "7");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "121");
	});
});

describe("AC 버튼 테스트", () => {
	it("AC 버튼이 제대로 작동합니다.", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "1");
		clickButton(".digit", "4");
		clickButton(".modifier", "AC");

		cy.get("#total").should("have.text", "0");
	});
});

describe("자리 수 검사", () => {
	it("3자리 수 이하만 입력할 수 있습니다.", () => {
		const stub = cy.stub();
		cy.on("window:alert", stub);

		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "1");
		clickButton(".digit", "2");
		clickButton(".digit", "3");
		clickButton(".digit", "4").then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				"3자리 이하의 수만 입력 가능합니다."
			);
		});
	});
});

describe("소수점 검사", () => {
	it("결과의 소수점 이하는 버림합니다. 999 / 11 = 90", () => {
		cy.visit("http://127.0.0.1:5500/index.html");

		clickButton(".digit", "9");
		clickButton(".digit", "9");
		clickButton(".digit", "9");
		clickButton(".operation", "/");
		clickButton(".digit", "1");
		clickButton(".digit", "1");
		clickButton(".operation", "=");

		cy.get("#total").should("have.text", "90");
	});
});
