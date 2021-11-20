import { MESSAGES } from "../../src/js/utils/constants.js";

describe("calculator test", () => {
	beforeEach("계산기 사이트로 이동한다.", () => {
		cy.visit("http://127.0.0.1:5500/");
	});

	it("숫자를 눌렀을 때 디스플레이에 해당 숫자로 변경된다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("9").click();
			cy.get("#total").should("have.text", "9");
		});
	});

	it("2개의 숫자에 대해 덧셈이 가능하다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("9").click();
			cy.get(".digits").contains("4").click();
			cy.get(".operation").contains("+").click();
			cy.get(".digits").contains("7").click();
			cy.get(".operation").contains("=").click();
			cy.get("#total").should("have.text", "101");
		});
	});

	it("2개의 숫자에 대해 뺄셈이 가능하다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("4").click();
			cy.get(".operation").contains("-").click();
			cy.get(".digits").contains("7").click();
			cy.get(".operation").contains("=").click();
			cy.get("#total").should("have.text", "-3");
		});
	});

	it("2개의 숫자에 대해 곱셈이 가능하다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("4").click();
			cy.get(".operation").contains("X").click();
			cy.get(".digits").contains("7").click();
			cy.get(".operation").contains("=").click();
			cy.get("#total").should("have.text", "28");
		});
	});

	it("2개의 숫자에 대해 나눗셈이 가능하다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("6").click();
			cy.get(".operation").contains("/").click();
			cy.get(".digits").contains("3").click();
			cy.get(".operation").contains("=").click();
			cy.get("#total").should("have.text", "2");
		});
	});

	it("AC(All Clear)버튼을 누르면 0으로 초기화 한다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("3").click();
			cy.get(".operation").contains("X").click();
			cy.get(".digits").contains("6").click();
			cy.get(".operation").contains("=").click();
			cy.contains("button", "AC").click();
			cy.get("#total").should("have.text", "0");
		});
	});

	it("숫자는 한번에 최대 3자리 수까지 입력 가능하다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("9").click();
			cy.get(".digits").contains("9").click();
			cy.get(".digits").contains("9").click();
			cy.get(".digits").contains("9").click();
			cy.get(".digits").contains("9").click();
			cy.get("#total").should("have.text", "999");
		});
	});

	it("계산 결과를 표현할 때 소수점 이하는 버림한다", () => {
		cy.get("#total").then(() => {
			cy.get(".digits").contains("6").click();
			cy.get(".operation").contains("/").click();
			cy.get(".digits").contains("4").click();
			cy.get(".operation").contains("=").click();
			cy.get("#total").should("have.text", "1");
		});
	});

	it("세자리이상 입력시 경고창을 표시한다", () => {
		const alertStub = cy.stub();
		cy.on("window:alert", alertStub);
		cy.get(".digits").contains("9").click();
		cy.get(".digits").contains("9").click();
		cy.get(".digits").contains("9").click();
		cy.get(".digits")
			.contains("9")
			.click()
			.then(() => {
				expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.DIGIT_ERROR);
			});
	});

	it("연산자 클릭시 배경색이 빨간색으로 수정된다", () => {
		cy.get(".digits").contains("6").click();
		cy.get(".operation")
			.contains("/")
			.click()
			.then(() => {
				cy.get(".operation")
					.contains("/")
					.should("have.css", "background-color", "rgb(255, 0, 0)");
			});
	});
});
