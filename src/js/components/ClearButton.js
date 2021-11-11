import DataSet from "../constants/DataSet.js";
import Component from "../core/Component.js";

export default class ClearButton extends Component {
  template() {
    return `
        <button class="modifier" data-type="${DataSet.clear}"  data-test-clear="clear">AC</button>
    `;
  }
}
