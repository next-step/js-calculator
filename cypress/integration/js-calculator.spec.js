import { id, txt, msg } from '../../src/js/settings';

describe('js-calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    const [cmds, expected] = ['999+999=', 999 + 999];
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', expected);
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    const [cmds, expected] = ['999-99=', 999 - 99];
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', expected);
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    const [cmds, expected] = [`999${txt.multi}999=`, 999 * 999];
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', expected);
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    const [cmds, expected] = ['999/9=', 999 / 9];
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', expected);
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    const cmds = '999';
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', cmds);

    cy.clkBtnByTxt(txt.ac);
    cy.getById(id.total).should('have.text', 0);
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    const [cmds, stub] = ['999', cy.stub()];
    cy.on('window:alert', stub);
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));

    cy.clkBtnByTxt(9).then(() => {
      expect(stub.getCall(0)).to.be.calledWith(msg.overflow);
      cy.getById(id.total).should('have.text', cmds);
    });
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    const [cmds, expected] = ['999/99=', (999 / 99) ^ 0];
    [...cmds].forEach(cmd => cy.clkBtnByTxt(cmd));
    cy.getById(id.total).should('have.text', expected);
  });
});
