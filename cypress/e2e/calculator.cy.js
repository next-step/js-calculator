const URL = "http://127.0.0.1:5500/index.html";

describe("사칙연산 테스트", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	it("두 숫자를 더한 결과가 정상적으로 출력된다", () => {
		cy.clickDigits("22");
		cy.clickOperator("+");
		cy.clickDigits("3");
		cy.clickOperator("=");

		cy.getDisplayNumber("25");
	});

	it("두 숫자를 뺀 결과가 정상적으로 출력된다", () => {
		cy.clickDigits("100");
		cy.clickOperator("-");
		cy.clickDigits("1");
		cy.clickOperator("=");

		cy.getDisplayNumber("99");
	});

	it("두 숫자를 곱한 결과가 정상적으로 출력된다", () => {
		cy.clickDigits("0");
		cy.clickOperator("X");
		cy.clickDigits("78");
		cy.clickOperator("=");

		cy.getDisplayNumber("0");
	});

	it("두 숫자를 나눈 결과가 정상적으로 출력된다", () => {
		cy.clickDigits("847");
		cy.clickOperator("/");
		cy.clickDigits("7");
		cy.clickOperator("=");

		cy.getDisplayNumber("121");
	});
});

describe("AC 버튼 테스트", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	it("AC버튼을 누르면 입력했던 정보들이 초기화된다.", () => {
		cy.clickDigits("144");
		cy.clickAllClear();

		cy.getDisplayNumber("0");
	});
});

describe("자리 수 검사", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	it("3자리 초과해 입력했을 때 경고창이 표시된다.", () => {
		const stub = cy.stub();
		cy.on("window:alert", stub);

		cy.clickDigits("123");
		cy.clickDigits("4").then(() => {
			expect(stub.getCall(0)).to.be.calledWith(
				"3자리 이하의 수만 입력 가능합니다."
			);
		});
	});
});

describe("소수점 검사", () => {
	beforeEach(() => {
		cy.visit(URL);
	});

	it("결과의 소수점 이하는 버림한다.", () => {
		cy.clickDigits("999");
		cy.clickOperator("/");
		cy.clickDigits("11");
		cy.clickOperator("=");

		cy.getDisplayNumber("90");
	});
});
