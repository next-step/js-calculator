class Component {
  constructor(target) {
    this.target = target
    this.state = document.getElementById('total')
  }

  changeState(target) {
    this.state.textContent = target
  }

  combineState() {
    this.state.textContent += this.target.textContent
  }

  render() { }
}

export default Component;
