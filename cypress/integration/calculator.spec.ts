const htmlMap = {
  buttons: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '7',
    8: '8',
    9: '9',
    0: '0',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '=': '=',
    AC: 'AC',
  },
  result: 'result',
} as const;

function clickButton(key: keyof typeof htmlMap.buttons) {
  return cy.get(`[data-cy="${htmlMap.buttons[key]}"]`).click();
}

function resultShouldHave(text: string) {
  return cy.get(`[data-cy="${htmlMap.result}"]`).should('have.text', text);
}

// 각 테스트 전 초기화
beforeEach(() => {
  cy.visit('/');
});

describe('계산기는', () => {
  // 2개의 숫자에 대해 덧셈이 가능하다.
  it('2 + 2의 결과로 4를 출력해야 한다.', () => {
    clickButton(2);
    clickButton('+');
    clickButton(2);
    clickButton('=');
    resultShouldHave('4');
  });

  it('0 + 123의 결과로 123을 출력해야 한다.', () => {
    clickButton(0);
    clickButton('+');
    clickButton(1);
    clickButton(2);
    clickButton(3);
    clickButton('=');
    resultShouldHave('123');
  });

  // 2개의 숫자에 대해 뺄셈이 가능하다.
  it('10 - 5의 결과로 5를 출력해야 한다.', () => {
    clickButton(1);
    clickButton(0);
    clickButton('-');
    clickButton(5);
    clickButton('=');
    resultShouldHave('5');
  });

  it('4 - 20의 결과로 -16을 출력해야 한다.', () => {
    clickButton(4);
    clickButton('-');
    clickButton(2);
    clickButton(0);
    clickButton('=');
    resultShouldHave('-16');
  });

  // 2개의 숫자에 대해 곱셈이 가능하다.
  it('32 * 3의 결과로 96을 출력해야 한다.', () => {
    clickButton(3);
    clickButton(2);
    clickButton('*');
    clickButton(3);
    clickButton('=');
    resultShouldHave('96');
  });

  it('4 * -2의 결과로 -8을 출력해야 한다.', () => {
    clickButton(4);
    clickButton('*');
    clickButton('-');
    clickButton(2);
    clickButton('=');
    resultShouldHave('-8');
  });

  // 2개의 숫자에 대해 나눗셈이 가능하다.
  it('12 / 4의 결과로 3을 출력해야 한다.', () => {
    clickButton(1);
    clickButton(2);
    clickButton('/');
    clickButton(4);
    clickButton('=');
    resultShouldHave('3');
  });

  it('-8 / 2의 결과로 -4를 출력해야 한다.', () => {
    clickButton('-');
    clickButton(8);
    clickButton('/');
    clickButton(2);
    clickButton('=');
    resultShouldHave('-4');
  });

  // AC(All Clear)버튼을 누르면 0으로 초기화 한다.
  it('AC(All Clear)버튼을 누르면 0으로 초기화되어야 한다.', () => {
    clickButton(1);
    resultShouldHave('1');
    clickButton('AC');
    resultShouldHave('0');
  });

  // 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
  it('1234를 입력하면 123만 출력되어야 한다.', () => {
    clickButton(1);
    clickButton(2);
    clickButton(3);
    clickButton(4);
    resultShouldHave('123');
  });

  // 계산 결과를 표현할 때 소수점 이하는 버림한다.
  it('10 / 3의 결과로 3를 출력해야 한다.', () => {
    clickButton(1);
    clickButton(0);
    clickButton('/');
    clickButton(3);
    clickButton('=');
    resultShouldHave('3');
  });
});
