const clickDigits = (digits) => {
  [...digits].forEach((digit) => {
    clickDigit(digit);
  });
};

const clickDigit = (number) => {
  cy.get(".digit").contains(number).click();
};

const clickOperator = (operator) => {
  cy.get(".operation").contains(operator).click();
};

const clickAcBtn = () => {
  cy.get(".modifier").click();
};

const getAnswer = (number) => {
  cy.get("#total").contains(number);
};

describe("계산기 요구사항 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다", () => {
    clickDigits("90");
    clickOperator("+");
    clickDigits("81");
    clickOperator("=");

    getAnswer("171");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다", () => {
    clickDigits("901");
    clickOperator("-");
    clickDigits("101");
    clickOperator("=");

    getAnswer("800");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다", () => {
    clickDigits("40");
    clickOperator("X");
    clickDigits("32");
    clickOperator("=");

    getAnswer("1280");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다", () => {
    clickDigits("55");
    clickOperator("/");
    clickDigits("11");
    clickOperator("=");

    getAnswer("5");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다", () => {
    clickDigits("901");
    clickOperator("-");
    clickDigits("809");
    clickOperator("=");
    clickAcBtn();

    getAnswer("0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다", () => {
    clickDigits("123456");

    getAnswer("123");
  });
});
