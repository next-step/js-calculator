import { ERROR_MESSAGES } from '../../src/js/constants';
import { getByDataset, checkAlertMessage } from '../support/calculator';

describe('계산기를 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('index.html');
  });

  it('숫자를 클릭하면 화면에 입력한 숫자가 보여진다.', () => {
    getByDataset('1').click();
    getByDataset('2').click();
    getByDataset('total').should('have.text', '12');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    getByDataset('1').click();
    getByDataset('+').click();
    getByDataset('2').click();
    getByDataset('=').click();

    getByDataset('total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    getByDataset('3').click();
    getByDataset('-').click();
    getByDataset('2').click();
    getByDataset('=').click();

    getByDataset('total').should('have.text', '1');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    getByDataset('5').click();
    getByDataset('X').click();
    getByDataset('3').click();
    getByDataset('=').click();

    getByDataset('total').should('have.text', '15');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    getByDataset('8').click();
    getByDataset('/').click();
    getByDataset('2').click();
    getByDataset('=').click();

    getByDataset('total').should('have.text', '4');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    getByDataset('1').click();
    getByDataset('AC').click();
    getByDataset('total').should('have.text', '0');

    getByDataset('5').click();
    getByDataset('X').click();
    getByDataset('3').click();
    getByDataset('=').click();
    getByDataset('AC').click();
    getByDataset('total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    getByDataset('1').click();
    getByDataset('1').click();
    getByDataset('1').click();
    getByDataset('1').click();
    checkAlertMessage(ERROR_MESSAGES.MAX_DIGIT_NUMBER);
    getByDataset('total').should('have.text', '111');

    getByDataset('AC').click();

    getByDataset('1').click();
    getByDataset('+').click();
    getByDataset('2').click();
    getByDataset('5').click();
    getByDataset('9').click();
    getByDataset('2').click();
    checkAlertMessage(ERROR_MESSAGES.MAX_DIGIT_NUMBER);

    getByDataset('total').should('have.text', '1+259');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    getByDataset('9').click();
    getByDataset('/').click();
    getByDataset('4').click();
    getByDataset('=').click();

    getByDataset('total').should('have.text', '2');
  });
});
