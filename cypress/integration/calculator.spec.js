describe('basic requirement test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('두 수에 대한 덧셈이 가능한가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-add]').click();
    cy.get('[data-test=btn-2]').click();
    cy.get('[data-test=btn-equal]').click();

    cy.get('[data-test=total]').contains(5);
  });

  it('두 수에 대한 뺄셈이 가능한가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-sub]').click();
    cy.get('[data-test=btn-2]').click();
    cy.get('[data-test=btn-equal]').click();

    cy.get('[data-test=total]').contains(1);
  });

  it('두 수에 대한 곱셈이 가능한가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-mul]').click();
    cy.get('[data-test=btn-2]').click();
    cy.get('[data-test=btn-equal]').click();

    cy.get('[data-test=total]').contains(6);
  });

  it('두 수에 대한 나눗셈이 가능한가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-div]').click();
    cy.get('[data-test=btn-2]').click();
    cy.get('[data-test=btn-equal]').click();

    cy.get('[data-test=total]').contains(1);
  });

  it('AC 버튼을 누르면 0으로 초기화 되는가 ?', () => {
    cy.get('[data-test=btn-3]').dblclick();
    cy.get('[data-test=total]').contains(33);

    cy.get('[data-test=btn-ac]').click();
    cy.get('[data-test=total]').contains(0);
  });

  it('숫자는 한번에 최대 3자리 수까지만 입력 가능한가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-3]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('숫자는 세 자리까지만 입력 가능합니다!');
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림되는가 ?', () => {
    cy.get('[data-test=btn-3]').click();
    cy.get('[data-test=btn-div]').click();
    cy.get('[data-test=btn-2]').click();
    cy.get('[data-test=btn-equal]').click();

    cy.get('[data-test=total]').contains(1);
  });
});
