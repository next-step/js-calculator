describe("calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const getTotal = () => cy.get("h1#total");
  const getDigit = (digit) => cy.get(`button.digit:contains('${digit}')`);
  const getOperation = (operation) =>
    cy.get(`button.operation:contains('${operation}')`);
  const getAC = () => cy.get("button.modifier");

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    getDigit("1").click();
    getOperation("+").click();
    getDigit("2").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "3");
    });
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    getDigit("2").click();
    getOperation("-").click();
    getDigit("1").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "1");
    });
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    getDigit("2").click();
    getOperation("X").click();
    getDigit("3").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "6");
    });
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    getDigit("4").click();
    getOperation("/").click();
    getDigit("2").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "2");
    });
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    getDigit("1").click();
    getAC().click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "0");
    });
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    getDigit("1").click();
    getDigit("2").click();
    getDigit("3").click();
    getDigit("4").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "123");
    });
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    getDigit("3").click();
    getOperation("/").click();
    getDigit("2").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "1");
    });
  });

  it("0으로 나누면 Infinity를 표시해준다.", () => {
    getDigit("2").click();
    getOperation("/").click();
    getDigit("0").click();
    getOperation("=").click();
    getTotal().then(($total) => {
      assert.equal($total.text(), "Infinity");
    });
  });
});
