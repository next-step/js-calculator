const clickDigit = (text) => cy.contains(".digit", text).click();
const clickOperator = (text) => cy.contains(".operation", text).click();
const clickAllClear = () => cy.get(".modifier").click();
const getDisplayNumber = (text) => cy.get("#total").should("have.text", text);

describe("사칙연산 테스트", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5501/index.html");
	});

	it("22 + 3 = 25", () => {
		clickDigit("2");
		clickDigit("2");
		clickOperator("+");
		clickDigit("3");
		clickOperator("=");

		getDisplayNumber("25");
	});

	it("100 - 1 = 99", () => {
		clickDigit("1");
		clickDigit("0");
		clickDigit("0");
		clickOperator("-");
		clickDigit("1");
		clickOperator("=");

		getDisplayNumber("99");
	});

	it("0 * 7 = 0", () => {
		clickDigit("0");
		clickOperator("X");
		clickDigit("7");
		clickOperator("=");

		getDisplayNumber("0");
	});

	it("847 / 7 = 121", () => {
		clickDigit("8");
		clickDigit("4");
		clickDigit("7");
		clickOperator("/");
		clickDigit("7");
		clickOperator("=");

		getDisplayNumber("121");
	});
});

describe("AC 버튼 테스트", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5501/index.html");
	});

	it("AC 버튼이 제대로 작동합니다.", () => {
		clickDigit("1");
		clickDigit("4");
		clickAllClear();

		getDisplayNumber("0");
	});
});

describe("자리 수 검사", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5501/index.html");
	});

	it("3자리 수 이하만 입력할 수 있습니다.", () => {
		const stub = cy.stub();
		cy.on("window:alert", stub);

		clickDigit("1");
		clickDigit("2");
		clickDigit("3");
		clickDigit("4").then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				"3자리 이하의 수만 입력 가능합니다."
			);
		});
	});
});

describe("소수점 검사", () => {
	beforeEach(() => {
		cy.visit("http://127.0.0.1:5501/index.html");
	});

	it("결과의 소수점 이하는 버림합니다. 999 / 11 = 90", () => {
		clickDigit("9");
		clickDigit("9");
		clickDigit("9");
		clickOperator("/");
		clickDigit("1");
		clickDigit("1");
		clickOperator("=");

		getDisplayNumber("90");
	});
});
