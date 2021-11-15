export class Digits {
  constructor(elements, display, state) {
    this.elements = elements;
    this.display = display;
    this.state = state;

    this.input = this.input.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
  init() {
    [].forEach.call(this.elements, ele => {
      ele.addEventListener('click', eve => {
        this.input(Number.parseInt(eve.target.innerText));
      });
    });
  }
  input(num) {
    const { state } = this;
    if (state.currInput[0] === '0') state.currInput = ''; // 첫 자리가 0으로 시작하는 경우 0제거
    if (state.currInput.length <= 2) {
      // 세자리 숫자까지만 입력가능
      state.currInput += num; // 숫자입력의 편의성을 위해 String으로 처리

      const prevInput =
        state.prevInput && state.operator !== ''
          ? state.prevInput + ' ' + state.operator + ' '
          : '';

      this.display(prevInput + state.currInput);
    } else {
      alert('3자리 숫자까지만 입력 가능합니다');
    }
  }
}
