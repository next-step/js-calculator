import Component from "../Component.js";

class Equal extends Component {
  constructor(target) {
    super(target)
    this.render() 
  }

  render() {
    const operator = [...this.state.textContent].filter(e => isNaN(Number(e)))
    const [first, second] = this.state.textContent.split(operator[0])
    const answer = Number(first) + Number(second)
    this.state.textContent = answer
  }
};

export default Equal;