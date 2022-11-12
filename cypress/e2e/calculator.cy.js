describe('<Calculator />', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    const [INPUT, RESULT] = ['234+123', '357'];
    cy.clickNumbers(INPUT);
    cy.judgeResult(RESULT);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    const [INPUT, RESULT] = ['234-123', '111'];
    cy.clickNumbers(INPUT);
    cy.judgeResult(RESULT);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    const [INPUT, RESULT] = ['234X123', '28782'];
    cy.clickNumbers(INPUT);
    cy.judgeResult(RESULT);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const [INPUT, RESULT] = ['222/111', '2'];
    cy.clickNumbers(INPUT);
    cy.judgeResult(RESULT);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const [INPUT, CLEAR_VALUE] = ['234', '0'];
    cy.clickNumbers(INPUT);
    cy.contains('button', 'AC').click();
    cy.judgeResult(CLEAR_VALUE);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const [INPUT, EXTRA] = ['234', '5'];
    cy.clickNumbers(INPUT);
    cy.contains('button', EXTRA).click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('숫자는 세 자리까지만 입력 가능합니다!');
    });
    cy.get('#total').should('have.text', INPUT);
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const [INPUT, RESULT] = ['234/123', '2'];
    cy.clickNumbers(INPUT);
    cy.judgeResult(RESULT);
  });

  //Extra
  it('3가지 숫자를 연산하려는 경우 경고창 발생', () => {
    const [INPUT, EXTRA] = ['234/123', '+'];

    cy.clickNumbers(INPUT);
    cy.contains('button', EXTRA).click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('두개의 숫자만 계산할 수 있습니다.');
    });
    cy.get('#total').should('have.text', INPUT);
  });
});
