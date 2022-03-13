describe("계산기 테스트", () => {
  const plus = "plus";
  const minus = "minus";
  const multiplication = "multiplication";
  const division = "division";
  const calcTestCase = [
    {
      operator: plus,
      value: "17",
      title: "2개의 숫자에 대해 덧셈이 가능하다.",
    },
    {
      operator: minus,
      value: "1",
      title: "2개의 숫자에 대해 뺄셈이 가능하다.",
    },
    {
      operator: multiplication,
      value: "72",
      title: "2개의 숫자에 대해 곱셈이 가능하다.",
    },
    {
      operator: division,
      value: "1",
      title: "2개의 숫자에 대해 나눗셈이 가능하다.",
    },
  ];

  const calcTest = (operator) => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get("[data-test-id=" + `${operator}` + "]").click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
  };

  calcTestCase.forEach(({ operator, value, title }) => {
    it(title, () => {
      calcTest(operator);
      cy.get("#total").should("have.text", value);
    });
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get("#clear").click();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="9"]').click();
    cy.get("#total").should("have.text", "999");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get('[data-test-id="9"]').click();
    cy.get('[data-test-id="division"]').click();
    cy.get('[data-test-id="8"]').click();
    cy.get('[data-test-id="equal"]').click();
    cy.get("#total").should("have.text", "1");
  });
});
