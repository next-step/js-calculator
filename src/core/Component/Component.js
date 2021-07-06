export default class Component {
  constructor(target, props = {}, state = {}) {
    this.$target = target
    this.$props = props
    this.$state = state

    this.setState(state)
    this.setEvent(target)
  }

  setState(state) {
    this.$state = { ...this.$state, ...state }
    this.render()
  }

  setEvent(target) {}

  render() {
    this.$target.innerHTML = this.template()
  }

  template() {
    return ``
  }
}
