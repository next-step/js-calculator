import Component from "./Component.js";

class Digit extends Component{
  constructor(target) {
    super(target)
    this.render()
  }

  firstDiginRender() {
    if (this.state.textContent === '0' && this.state.textContent.length === 1) {
      this.state.textContent = this.target.textContent
    }
  }  

  render() {
    
    const regExp = /[^0-9]/g;
    const isThereOperator = regExp.test(this.state.textContent)

    if (this.state.textContent === '0' && this.state.textContent.length === 1) {
      this.state.textContent = this.target.textContent
      return;
    }
    
    if (!isThereOperator && this.state.textContent.length < 3 ) {
      this.state.textContent += this.target.textContent
      return;
    }

    if (isThereOperator && this.state.textContent.length < 7) {
      this.state.textContent += this.target.textContent
      return;
    }
  }
}

export default Digit;