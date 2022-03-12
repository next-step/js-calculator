import Component from "../Component.js";

class Plus extends Component {
  constructor(target) {
    super(target)
    this.render() 
  }

  render() {
    if (!isNaN(Number(this.state.textContent))) {
      this.state.textContent += this.target.textContent
    }
  }
};

export default Plus;