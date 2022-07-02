export const INITIAL_STATE = {
  total: 0,
  presentation: 0,
  operator: undefined,
  firstTerm: undefined,
  secondTerm: undefined,
};

export class Calculator {
  state = { ...INITIAL_STATE };

  constructor($app) {
    this.$app = $app;
    this.$total = $app.querySelector("#total");
  }

  setState(key, value) {
    if (this.state.hasOwnProperty(key)) {
      this.state[key] = value;
      this.render();
    } else {
      throw new Error("Invalid state key");
    }
  }

  render = () => {
    this.$total.innerText = `${this.state.presentation}`;
  };

  appendTerm = (key, value) => {
    const nextTerm = this.state[key].concat(value);
    if (nextTerm.length > 3) throw new Error("3자리 수 이상은 입력할 수 없습니다.");
    else this.setState(key, nextTerm);
  };

  setTerm = (key, value) => {
    const currentTerm = this.state[key];
    if (currentTerm === undefined) {
      this.setState(key, `${value}`);
    } else {
      this.appendTerm(key, value);
    }
    this.setState("presentation", this.state[key]);
  };

  setFirstTerm = (value) => {
    this.setTerm("firstTerm", value);
  };

  setSecondTerm = (value) => {
    this.setTerm("secondTerm", value);
  };

  clear = () => {
    this.state = { ...INITIAL_STATE };
    this.render();
  };
}
