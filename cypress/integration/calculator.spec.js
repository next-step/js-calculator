describe('Calculator app test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Confirm Component initial render ', () => {
    it('total display', () => {
      cy.getTotalDisplay().contains(0);
    });

    it('Number panels', () => {
      cy.getNumberPanel(0).contains(0);
      cy.getNumberPanel(1).contains(1);
      cy.getNumberPanel(2).contains(2);
      cy.getNumberPanel(3).contains(3);
      cy.getNumberPanel(4).contains(4);
      cy.getNumberPanel(5).contains(5);
      cy.getNumberPanel(6).contains(6);
      cy.getNumberPanel(7).contains(7);
      cy.getNumberPanel(8).contains(8);
      cy.getNumberPanel(9).contains(9);
    });

    it('Operator panels', () => {
      cy.getOperatorPanel('+').contains('+');
      cy.getOperatorPanel('-').contains('-');
      cy.getOperatorPanel('X').contains('X');
      cy.getOperatorPanel('/').contains('/');
      cy.getOperatorPanel('=').contains('=');
    });

    it('Modifier panel', () => {
      cy.getModifierPanel().contains('AC');
    });
  });

  context('basic requirement', () => {
    it('두 수에 대한 덧셈이 가능한가 ?', () => {
      cy.clickNumberPanel(3);
      cy.clickOperatorPanel('+');
      cy.clickNumberPanel(2);
      cy.clickOperatorPanel('=');

      cy.getTotalDisplay().contains(5);
    });
    it('두 수에 대한 뺄셈이 가능한가 ?', () => {
      cy.clickNumberPanel(3);
      cy.clickOperatorPanel('-');
      cy.clickNumberPanel(2);
      cy.clickOperatorPanel('=');

      cy.getTotalDisplay().contains(1);
    });
    it('두 수에 대한 곱셈이 가능한가 ?', () => {
      cy.clickNumberPanel(3);
      cy.clickOperatorPanel('X');
      cy.clickNumberPanel(2);
      cy.clickOperatorPanel('=');

      cy.getTotalDisplay().contains(6);
    });
    it('두 수에 대한 나눗셈이 가능한가 ?', () => {
      cy.clickNumberPanel(3);
      cy.clickOperatorPanel('/');
      cy.clickNumberPanel(2);
      cy.clickOperatorPanel('=');

      cy.getTotalDisplay().contains(1);
    });
    it('AC 버튼을 누르면 0으로 초기화 되는가 ?', () => {
      cy.clickNumberPanel(1);
      cy.clickNumberPanel(1);
      cy.clickNumberPanel(1);
      cy.getTotalDisplay().contains(111);

      cy.clickACPanel();
      cy.getTotalDisplay().contains(0);
    });
    it('숫자는 한번에 최대 3자리 수까지만 입력 가능한가 ?', () => {
      cy.clickNumberPanel(1);
      cy.clickNumberPanel(1);
      cy.clickNumberPanel(1);
      cy.clickNumberPanel(1);

      cy.on('window:alert', (text) => {
        expect(text).to.contains('숫자는 세 자리까지만 입력 가능합니다!');
      });
    });
    it('계산 결과를 표현할 때 소수점 이하는 버림되는가 ?', () => {
      cy.clickNumberPanel(3);
      cy.clickOperatorPanel('/');
      cy.clickNumberPanel(2);
      cy.clickOperatorPanel('=');

      cy.getTotalDisplay().contains(1);
    });
  });
});
