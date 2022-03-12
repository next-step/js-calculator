import Component from "../Component.js";

class Equal extends Component {
  constructor(target) {
    super(target)
    this.render() 
  }

  render() {
    if (isNaN(Number(this.state.textContent))) {
      const operator = [...this.state.textContent].filter(e => isNaN(Number(e)))
      const [first, second] = this.state.textContent.split(operator[0])
      const answer = Number(first) + Number(second)
      this.state.textContent = answer
    } else {
      alert('다른 연산자를 입력해주세요 :)')
    }
  }
};

export default Equal;