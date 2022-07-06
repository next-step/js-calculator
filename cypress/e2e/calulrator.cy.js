import { SELECTORS_CLASS, SELECTORS_ID } from '../../src/js/constants'
describe('계산기 테스트를 시작합니다', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  })
  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '5');
    cy.userClick(SELECTORS_CLASS.OPERATION, '+');
    cy.userClick(SELECTORS_CLASS.DIGIT, '2');
    cy.getResult();
    cy.checkResult('7');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '5');
    cy.userClick(SELECTORS_CLASS.OPERATION, '-');
    cy.userClick(SELECTORS_CLASS.DIGIT, '9');
    cy.getResult();
    cy.checkResult('-4');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '9');
    cy.userClick(SELECTORS_CLASS.OPERATION, 'X');
    cy.userClick(SELECTORS_CLASS.DIGIT, '9');
    cy.getResult();
    cy.checkResult('81');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '4');
    cy.userClick(SELECTORS_CLASS.OPERATION, '/');
    cy.userClick(SELECTORS_CLASS.DIGIT, '2');
    cy.getResult();
    cy.checkResult('2');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '4');
    cy.userClick(SELECTORS_CLASS.OPERATION, '+');
    cy.userClick(SELECTORS_CLASS.DIGIT, '2');
    cy.get(SELECTORS_CLASS.MODIFIER).click();
    cy.checkResult('0')
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '1');
    cy.userClick(SELECTORS_CLASS.DIGIT, '2');
    cy.userClick(SELECTORS_CLASS.DIGIT, '3');
    cy.userClick(SELECTORS_CLASS.DIGIT, '4');
    cy.userClick(SELECTORS_CLASS.DIGIT, '5');
    cy.on('window:alert',(alertText)=>{
      expect(alertText).to.contains('숫자는 3자리를 넘을 수 없습니다.');
    });
  });

  it('연산자는 중복해서 입력할 수 없습니다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '5');
    cy.userClick(SELECTORS_CLASS.OPERATION, '+');
    cy.userClick(SELECTORS_CLASS.OPERATION, '-');
    cy.get(SELECTORS_ID.TOTAL).should('not.have.text', '+-')
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.userClick(SELECTORS_CLASS.DIGIT, '7');
    cy.userClick(SELECTORS_CLASS.OPERATION, '/');
    cy.userClick(SELECTORS_CLASS.DIGIT, '3');
    cy.getResult();
    cy.checkResult('2');
  });
});
