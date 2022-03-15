import Component from "../Abstract/Component.js";

class Modifier extends Component{
  constructor(target) {
    super(target)
    this.render()
  }

  render() {
    this.state.textContent = '0'
  }
}

export default Modifier;
