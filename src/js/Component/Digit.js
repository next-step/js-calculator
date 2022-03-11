import Component from "./Component.js";

class Digit extends Component{
  constructor(target) {
    super(target)
    this.render()
  }

  render() {
    if (this.state.textContent === '0' && this.state.textContent.length === 1) {
      this.state.textContent = this.target.textContent
      return;
    }

    this.state.textContent += this.target.textContent
  }
}

export default Digit;