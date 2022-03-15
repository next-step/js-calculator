import Component from "../Abstract/Component.js";

class Digit extends Component{
  constructor(target) {
    super(target)
    this.render()
  }

  render() {
    const regExp = /[^0-9]/g;
    const isThereOperator = regExp.test(this.state.textContent)

    if (this.state.textContent === '0' && this.state.textContent.length === 1) {
      this.changeState(this.target.textContent)
      return;
    }
    
    if (!isThereOperator && this.state.textContent.length < 3 ) {
      this.combineState()
    }

    if (isThereOperator && this.state.textContent.length < 7) {
      this.combineState()
    }
  }
}

export default Digit;
