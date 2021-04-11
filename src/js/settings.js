const SETTINGS = {
  tag: {
    button: 'BUTTON',
  },
  id: {
    total: 'total',
  },
  txt: {
    ac: 'AC',
    multi: '×' /** String.fromCharCode(215) */,
  },
  evType: {
    click: 'click',
  },
  opChr: {
    plus: '+',
    minus: '-',
    multi: '*',
    divi: '/',
    eq: '=',
  },
  defVal: {
    total: '0',
    maxDgts: '3',
  },
  msg: {
    overflow: '숫자는 세 자리까지만 입력 가능합니다!',
    noDigit: '숫자를 먼저 입력한 후 연산자를 입력해주세요!',
    noElem: 'There is no element.',
    invalidChr: 'Invalid Character.',
  },
};

export default SETTINGS;
