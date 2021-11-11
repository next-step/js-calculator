import Component from "../core/Component.js";

export default class ResultPanel extends Component {
  setup() {
    this.$state = { result: "0" };
  }

  template() {
    return this.$state.result;
  }
}
