describe("계산기 Test", () => {
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.get(".digits").as("digits");
    cy.get(".operations").as("operations");
    cy.get(".modifier").as("modifier");
    cy.get("#total").as("total");
  });

  afterEach(() => {
    cy.get("@modifier").click();
  })

  const testData = [
    {
      operation: "+",
      operationKr: "덧셈",
      prevNum: '255',
      nextNum: '15',
      expectedNum: '270',
    },
    {
      operation: "-",
      operationKr: "뺄셈",
      prevNum: '255',
      nextNum: '15',
      expectedNum: '240',
    },
    {
      operation: "/",
      operationKr: "나눗셈",
      prevNum: '18',
      nextNum: '6',
      expectedNum: '3',
    },
    {
      operation: "X",
      operationKr: "곱셈",
      prevNum: '5',
      nextNum: '6',
      expectedNum: '30',
    },
  ]

  const operatorTestFnc = ({ prevNum, nextNum, expectedNum, operation }) => {
    [...prevNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains(operation).click();

    [...nextNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains("=").click();
    cy.get("@total").should("have.text", expectedNum);
  }

  testData.forEach((data) => {
    it(`2개의 숫자에 대해 ${data.operationKr}이 가능하다.`, () => {
      operatorTestFnc(data);
    });
  });

  it("0보다 큰 숫자를 먼저 입력 해야 연산자 입력이 가능하다.", () => {
    testData
      .map(({ operation }) => ({ operation }))
      .forEach(({ operation }) => {
        cy.get("@operations").contains(operation).click();
        cy.on('window:alert', (txt) => {
          expect(txt).to.contains("숫자를 먼저 입력 후 연산자를 입력해주세요.");
        });
      });
  })

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    const calcNum = '2556';
    [...calcNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains("숫자는 세 자리까지만 입력 가능합니다!");
    });
  })

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    const calcNum = '70';
    const expectedNum = '0';

    [...calcNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@modifier").click();
    cy.get("@total").should("have.text", expectedNum);
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    const { operation, prevNum, nextNum, expectedNum } = testData[2];

    [...prevNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains(operation).click();

    [...nextNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains("=").click();
    cy.get("@total").should("have.text", expectedNum);
  });

  it("숫자 1개와 연산자를 입력한 상태에서 equal 제외한 다른 연산자를 입력하면 최신의 입력한 연산자로 변경된다.", () => {
    const { operation, prevNum } = testData[0];

    [...prevNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains(operation).click();

    testData
      .map(({ operation }) => ({ operation }))
      .forEach(({ operation }) => {
        cy.get("@operations").contains(operation).click();
        cy.get("@total").should("have.text", `${prevNum}${operation}`);
      });
  });

  it("숫자 2개와 연산자를 입력한 상태에서 equal 제외한 다른 연산자를 입력하면, total 연산된 숫자와 추가된 연산자가 입력된다.", () => {
    const { operation, prevNum, nextNum, expectedNum } = testData[0];

    [...prevNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    cy.get("@operations").contains(operation).click();

    [...nextNum].forEach((num) => {
      cy.get("@digits").contains(num).click();
    });

    testData
      .map(({ operation }) => ({ operation }))
      .forEach(({ operation }) => {
        cy.get("@operations").contains(operation).click();
        cy.get("@total").should("have.text", `${expectedNum}${operation}`);
      });
  })
})
